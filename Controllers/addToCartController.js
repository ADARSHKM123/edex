const createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const Cart = require('../Models/cartItemsModel');


exports.addToCart =catchAsync( async(req,res,next)=>{
  const user = req.user._id;
  const {products,quantity,price} = req.body;
  console.log(req.body);

  const newCart =await Cart.create({user,products,quantity,price})
  res.status(200).json({
    status:'success',
    data:{
      newCart
    }
  })
})