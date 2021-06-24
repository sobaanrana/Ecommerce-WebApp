const mongoose = require('mongoose');
const Joi = require('Joi');
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    },
    dp: { //from cloudinary
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }


})

userSchema.methods.generateHashedPassword =async  function() { //we can write custom methods on each user record
    let salt = await bcrypt.genSalt(10) //it create dummy string which starting point for randomzation using which we encrypt our password
    this.password = await bcrypt.hash(this.password,salt); //user for login gives password and we hash it to save as in encrypted from
}
const User = mongoose.model('User', userSchema);

function validateSignup(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(3).max(10).required(),
        role: Joi.string().required(),
        dp: { 
            public_id: Joi.string(),
            url: Joi.string()
        }

    });
    return schema.validate(data, { abortEarly: false});
}

function validateLogin(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(3).max(10).required(), 

    });
    return schema.validate(data, { abortEarly: false});

}


module.exports.User = User;
module.exports.validateSign = validateSignup; //for up
module.exports.validateLog = validateLogin;