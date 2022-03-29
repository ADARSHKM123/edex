const createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const Cart = require('../Models/cartItemsModel');
const User = require('../Models/userModel');




exports.addToCart = catchAsync(async(req,res,next)=>{
 
  const user = req.user._id; //TODO: the logged in user id
// console.log(user);
  if(!req.body.productId) req.body.productId= req.params.productId;

    const { productId, quantity, name, price } = req.body;
  
  
    try {
      let cart = await Cart.findOne({ user });

      if (cart) {
        console.log('cart is already here');
        //cart exists for user
        // let itemIndex = cart.products.findIndex(p => p.productId._id === req.body.productId);
        let itemIndex = cart.products.find(p => p.productId._id.equals(productId));

        if (itemIndex ) {
          //product exists in the cart, update the quantity
          // let productItem = cart.products[itemIndex];
          itemIndex.quantity =itemIndex.quantity + +quantity;
          // cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item 
          cart.products.push({ productId, quantity, name, price,user });
        }
        cart = await cart.save();
        return res.status(200).json({cart});
      } else {
        console.log('new Cart');
        
        //no cart for user, create new cart
        const newCart = await Cart.create({
         user: user,
         products:{productId,quantity,price}
        });
  
        return res.status(200).json(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Something went wrong",err);
    }
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
  const user=req.user._id;
  const cartItems =await Cart.findOne({user:user})
  if(cartItems === null){
    return next(createError("No items in the cart",400))
  }
  res.status(200).json({
    status:'success',
    cartItems
  })
});