const mongoose = require('mongoose');
const User =require('./userModel');
const Product =require('./productModel');


const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
      },
      products:[
        {
          productId: {
          type:mongoose.Schema.ObjectId,
           ref: "Product",
          },
          quantity: {
            type:Number,
            default:1
          },
          name: String,
          price: Number
        }
      ],
      active: {
        type: Boolean,
        default: true
      },
      modifiedOn: {
        type: Date,
        default: Date.now 
      },
      quantity:{
        type:Number,
        default:1
      }   
},
{ timestamps: true },
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
)


// cartSchema.virtual('TotalPrice').get(function() {
//   return this.productId.price * this.quantity;
// });

cartSchema.pre(/^find/,function(next){
  this.populate('user')
  next()
})

cartSchema.pre(/^find/,function(next){
  this.populate({path:'products',populate:{
    path: 'productId'
  }}); 
  next()
})

// cartSchema.pre('save', async function(next){
//  const productPromises =  this.products.map(async each=> await User.findById(each.productId))
//  this.products = await Promise.all(productPromises);  
//  next();
// })



// cartSchema.pre('save', async function(next){
//   const product=await Product.findById(this.productId);
//   this.products = product;
//   // this.price =product.price
//   next()
// })


const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart 