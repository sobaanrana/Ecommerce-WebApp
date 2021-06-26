//this middleware ensures that with whatever route it is with should be accessed by the logged in user
//the user need to send tokwen along with the url to acces any functionality of an API
const jwt = require("jsonwebtoken");
const config = require("config");
const {User} = require("../models/user")

async function auth(req, res, next) { 
    let token = req.header("x-auth-token");
    if(!token) return res.status(400).send("Token Not Provided") 
   try {
    let user = jwt.verify(token, config.get("jwtPrivateKey")); 
    req.user = await User.findById(user._id); 
    } catch (error) {
       return res.status(401).send("Invalid Token")
   }
    next(); //with next call it goes back
}
module.exports = auth