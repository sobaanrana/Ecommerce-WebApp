var express = require('express');
var router = express.Router();
var Order = require('../models/order');
const auth = require('../middlewares/auth');

//Create a new order ; authorize?
router.post('/new',auth, async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    let order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now()
        //user: req.user._id
    })

    await order.save();

    res.status(200).json({
        success: true,
        order
    })
})

//Getting all the orders
router.get('/' , async (req, res, next) => {

    const orders = await Order.find();

    res.status(200).json({
        success: true,
        orders
                
        })
    
        
});

//Getting a single Order
router.get('/:id', async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(!order) {
        return res.status(404).json({
            success: false,
            message: 'order not found! Invalid order ID.'
        })
    }
  

    res.status(200).json({
        success: true,
        //len: req.params.id.length,
        order
    })

})

//updating an order
router.put('/update/:id',auth, async (req, res, next) => {
    if (req.params.id.length!=24) {
        return res.status(404).json({
            success: false,
            message: 'order not found! Enter order ID.'
        })
    }

    let order = await Order.findById(req.params.id);
    
    if(!order) {
        return res.status(404).json({
            success: false,
            message: 'order not found! Invalid order ID.'
        })
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, { //avoiding some warnings
        new: true, //to avoid warnings
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        order
    })
  })

//Deleting an order
router.delete('/delete/:id',auth, async (req, res, next) => {
    if (req.params.id.length!=24) {
        return res.status(404).json({
            success: false,
            message: 'order not found! Enter order ID.'
        })
    }

    let order = await Order.findById(req.params.id);
    
    if(!order) {
        return res.status(404).json({
            success: false,
            message: 'order not found! Invalid order ID.'
        })
    }

    await order.remove();
    //await order.findByIdAndDelete(req.params.id);


    res.status(200).json({
        success: true,
        message: 'order is deleted'
    })

})

module.exports = router;
