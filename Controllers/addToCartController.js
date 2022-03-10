const Product =require('../Models/productModel');
const catchAsync = require('../Util/catchAsync');
const Cart = require('../Models/cartModel');
const User = require('../Models/userModel');




exports.addToCart =catchAsync(async(req,res,next)=>{
    const { productId, quantity, name, price,userId  } = req.body;

    const user =await User.findById({userId});

    if(!user){
        return next(createError('You have to signUp first'),400)
    }
    
    let cart = await Cart.findOne({ userId });

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
        userId,
        products: [{ productId, quantity, name, price }]
      });
      return res.status(201).json({
        newCart
    })

    }

   });
