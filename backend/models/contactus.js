const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }

})


var ContactUs =  mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;