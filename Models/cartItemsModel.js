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
           ref: "Product"
          },
          quantity:{
            type:Number,
            default:1
          },
          price: Number,
          totalPrice:Number
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
},
{ timestamps: true },
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
)



// cartSchema.virtual('totalPrice').get(function () {
//   return this.price*this.quantity;
// });

// cartSchema.pre('save',function(next){
//   this.TotalPrice = this.productId.price * this.quantity;
//   next();
// });



cartSchema.pre(/^find/,function(next){
  this.populate({
    path:'user'
  }).populate({path:'products',populate:{
      path: 'productId'
      }})
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

Cart.collection.dropIndexes(function (err, results) {
 if(err) console.log(err);
 console.log('success');
});

module.exports = Cart 