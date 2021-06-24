const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true, //trimming blank spaces before and after the name
        maxLenght: [100, 'Product name can not exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLenght: [5, 'Product name can not exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    rating : {
        type: Number,
        default: 0.0
    },
    images: [ //since adding multiple images taking array
        { //cloudinary is used for images and it gives in response image id (public_id) and image url 
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }

    ],
    category: { //can only input category of product in list else validation error
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {//enums checks if the value is given in an array of strings
            values: [
                'Laptops',
                'Acessories',
                'Mobiles',
                'Headphones',
                'Cameras',
                'Electronics',
                'Cables',
                'Speakers',
                'Food',
                'Books',
                'Clothes',
                'Shirts',
                'Pants',
                'Shoes',
                'Watches',
                'Sports',
                'Outdoor',
                'Home',
                'Furniture',
                'Chairs',
                'Batteries',    
                'Beauty/Health'
            ],
            message: 'Please select correct category for product' //displayed when correct category not selected
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

var Product =  mongoose.model('Product', productSchema);

module.exports = Product;