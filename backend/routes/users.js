var express = require('express');
var router = express.Router();
const {User} = require('../models/user');
const {validateSignup, validateLogin} = require('../middlewares/validateUser')
var _ = require('lodash');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var config = require('config');
const cloudinary = require('cloudinary');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var users = await User.find();

  res.status(200).json({
    success: true,
    users
    })
});

router.post('/register',validateSignup, async (req, res) => {

  /*
  const displayPicture = await cloudinary.v2.uploader.upload(req.body.dp, {
    folder: 'dps',
    width: 150,
    crop: "scale" //selects aspect ratio of image auto
  })
  */

  let userPresent = await User.findOne({email: req.body.email});
  if(userPresent) {
    return res.status(400).send("User already registered");
  }

  //const {name, email, password,dp} = req.body

  //let user = await User.create(req.body)
  
  let user = await User.create(req.body)

  await user.generateHashedPassword(); //calling a method on it to generate hash password

  await user.save();


 res.status(200).send(_.pick(user,[,"name","email"]))

})

router.post('/login', validateLogin, async (req, res) => {
  let user = await User.findOne({email: req.body.email});

  if(!user) {
    return res.status(400).send("User Not Recognized");
  }
  let token = jwt.sign({_id: user._id, name: user.name}, config.get("jwtPrivateKey"))

  if(bcrypt.compare(req.body.password,user.password)) {
    return res.status(200).json({
      login : "Success",
      token,
      user,
      id: _.pick(user,"_id")

    }); 
  }
  else{
    return res.status(400).send("Wrong email or password"); 

  }
  
})

//getting single user
router.get('/:id', async (req, res) => {

  if (req.params.id.length!=24) {
    return res.status(404).json({
        success: false,
        message: 'User not found! Enter User ID.'
    })

  }
  let user = await User.findById(req.params.id);

  if(!user) {
      return res.status(404).json({
          success: false,
          message: 'User not found! Invalid product ID.'
      })
  }
 res.status(200).send({
      success: true,
      user,
      role: _.pick(user,["role"])
  })

})
module.exports = router;
