var express = require('express');
const ContactUs = require('../models/contactus');
var router = express.Router();

//Creating New Product
router.post('/message', async (req, res) => {

  let contact = await ContactUs.create(req.body);
  
  await contact.save();

  res.status(201).json({
      success: true,
      contact
          
  })
      
  
})

//Deleting
router.delete('/delete/:id', async (req, res, next) => {
  if (req.params.id.length!=24) {
      return res.status(404).json({
          success: false,
          message: 'Not found! Enter Valid ID.'
      })
  }

  let contact = await ContactUs.findById(req.params.id);
  
  if(!contact) {
      return res.status(404).json({
          success: false,
          message: 'Not found! Invalid ID.'
      })
  }

  await contact.remove();


  res.status(200).json({
      success: true,
      message: 'Deleted'
  })

})
module.exports = router;
