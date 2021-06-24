const {validateSign, validateLog} = require('../models/user');

function validateSignup(req, res, next) {
    let {error} = validateSign(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    next(); //next middleware
}

function validateLogin(req, res, next) {
    let {error} = validateLog(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;