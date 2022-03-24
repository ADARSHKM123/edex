const mongoose = require('mongoose');
const User =require('./userModel');



const cartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.ObjectId,
        ref: "User"
      },
      products: [
        {
          productId: mongoose.Schema.ObjectId,
          // ref: "Product",
          quantity: Number,
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
{ timestamps: true })



cartSchema.pre(/^find/,function(next){
  this.populate('user')
  next()
})




const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart