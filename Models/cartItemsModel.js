const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: Number,
      totalPrice: Number
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




cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user'
  }).populate({
    path: 'products', populate: {
      path: 'productId'
    }
  })
  next()
})




const Cart = mongoose.model('cart', cartSchema);

Cart.collection.dropIndexes(function (err, results) {
  if (err) console.log(err);
  //  console.log('success');
});

module.exports = Cart 