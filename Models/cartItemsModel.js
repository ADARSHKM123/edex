const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Booking must belong to a user!']
      },
      products:{
        type: mongoose.Schema.ObjectId,
        ref:"Product"
      },
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
{ timestamps: true })

// cartSchema.pre('save', async function(next){
//   const user=await User.findById(this.userId);
//   this.userId = user;
//   next()
// })


cartSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path:'products',
    select:'name'
});
  next();
});

// cartSchema.pre('save', async function(next){
//   const product=await Product.findById(this.productId);
//   this.products = product;
//   // this.price =product.price
//   next()
// })


const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart