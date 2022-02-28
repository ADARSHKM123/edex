const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            unique: true,
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'A product must have a category'],
        },
        image: {
            type: String,
            // required: [true, 'A product must have a cover image']
        },
        price: {
            type: Number,
            required: [true, 'A product must have a price']
        },
        rating: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0']
        },


    }
);

const Product = mongoose.model('Product',productSchema);


module.exports = Product; 