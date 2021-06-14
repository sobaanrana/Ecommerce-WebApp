var express = require('express');
var router = express.Router();
var Product = require('../models/product')
const APIFeatures = require('../API-Features/apiFeatures');


//Creating New Product
router.post('/admin/new', async (req, res) => {
    //let product = new Product();

    let product = await Product.create(req.body);
    //product.name = req.body.name;
    //product.price = req.body.price;
    
    await product.save();

    res.status(201).json({
        success: true,
        product
            
    })
        
    
    //return res.send(product);
})

//Getting all the products
router.get('/', async (req, res, next) => {

    const resPerPage = 4; //4 results per page
    const productsCount = await Product.countDocuments(); //for implementing pagination on the frontend, need to give total number of products in the database
    
    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

    let products = await apiFeatures.query;
    //let products = await Product.find(); // =>Search - await Product.find({name:'B-707 (BLUETOOTH HEADPHONE)'});

    //setTimeout(() => {
        res.status(200).json({
            success: true,
            //count: products.length,
            productsCount,
            products
                
        })
    //},2000);
    
        
});

//Getting a single product
router.get('/:id', async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found! Invalid product ID.'
        })
    }
  

    res.status(200).json({
        success: true,
        //len: req.params.id.length,
        product
    })

})

//Updating a Product
router.put('/admin/:id', async (req, res, next) => {
    if (req.params.id.length!=24) {
        return res.status(404).json({
            success: false,
            message: 'Product not found! Enter Product ID.'
        })
    }

    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found! Invalid product ID.'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { //avoiding some warnings
        new: true, //to avoid warnings
        runValidators: true,
        //useFindAndModify:fasle
    })

    res.status(200).json({
        success: true,
        product
    })
  })

//Deleting product =>
router.delete('/admin/:id', async (req, res, next) => {
    if (req.params.id.length!=24) {
        return res.status(404).json({
            success: false,
            message: 'Product not found! Enter Product ID.'
        })
    }

    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found! Invalid product ID.'
        })
    }

    await product.remove();
    //await Product.findByIdAndDelete(req.params.id);


    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })

})
module.exports = router;
