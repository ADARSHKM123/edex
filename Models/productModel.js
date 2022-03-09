const mongoose = require('mongoose');
const slugify = require('slugify');


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A tour name must have less or equal then 40 characters'],
            minlength: [2, 'A tour name must have more or equal then 2 characters']
        },
        slug:String,
        description:{
            type:String
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
        priceDiscount:{
            type:Number,
            validate: function(val){
              return val< this.price;
            },
            message: `The Discount Price ({VALUE}) should be below reguler price`
        },
        rating: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0']
        },
    },
    {
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
);

//Adding Virtuals
// productSchema.virtual('10% Discount').get(function() {
//    const discountedPrice = this.price * 10 /100;
//    this.price = this.price - discountedPrice;
//    return Math.round(this.price);
// });

productSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true})
    next();
});

//Document Middleware
productSchema.pre('save',function(next){
    console.log('will save...')
    next();
});

//Query Middleware
productSchema.pre(/^find/,function(next){
    next();
});


// productSchema.post(/^find/,function(doc,next){
//    console.log(doc);
//     next();
// });



const Product = mongoose.model('Product',productSchema);


module.exports = Product;    