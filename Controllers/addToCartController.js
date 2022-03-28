const createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const Cart = require('../Models/cartItemsModel');
const User = require('../Models/userModel');




exports.addToCart = catchAsync(async(req,res,next)=>{

  const user = req.user._id;

  if(!req.body.productId) req.body.productId= req.params.productId;

  const { productId, quantity,name,price} = req.body;

    const newuser =await User.findById(user);

    if(!newuser){
      return next(createError('You have to SignUP first', 400));
    }
    
    let cart = await Cart.findOne({user});

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity =productItem.quantity + quantity;
        cart.products[itemIndex] = productItem;
      } else { 
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).json({
          cart
      })
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        user,
        products: [{ productId, quantity, name, price }]
      });
      return res.status(201).json({
        newCart
    })

    }

    // res.status(200).json({
    //   status:'success'
    // })

   });

   exports.getAllCart=catchAsync(async(req,res,next)=>{
     const CartItems =await Cart.find();
     res.status(200).json({
       length:CartItems.length,
       data:{
         CartItems
       }
     })
   })

   exports.getCart=catchAsync(async(req,res,next)=>{
    const CartItem =await Cart.findById(req.params.id)
    res.status(200).json({
      status:'success',
      data:{
        CartItem
      }
    })
  })


   exports.deleteItem=catchAsync(async(req,res,next)=>{
     const cartItem = await Cart.findByIdAndDelete(req.params.id);
     res.status(204).json({  
      status: 'success',
      data: null
  })
   })



exports.getMyCart=catchAsync(async(req,res,next)=>{
  const userId=req.user._id;
  const cartItems =await Cart.findOne({user:userId})
  if(cartItems === null){
    return next(createError("No items in the cart",400))
  }
  res.status(200).json({
    status:'success',
    cartItems
  })
});