const createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const Cart = require('../Models/cartItemsModel');
const User = require('../Models/userModel');
const async = require('hbs/lib/async');


//Add To Cart /////////////////////////////////////////////////////////////

exports.addToCart = catchAsync(async (req, res, next) => {
  const user = req.user._id; 
  if (!req.body.productId) req.body.productId = req.params.productId;
  const { productId, quantity, name, price } = req.body;
  try {
    let cart = await Cart.findOne({ user });

    if (cart) {
      console.log('cart is already here');
      let itemIndex = cart.products.find(p => p.productId._id.equals(productId));
      if (itemIndex) {
        itemIndex.quantity = itemIndex.quantity + +quantity;
      } else {
        cart.products.push({ productId, quantity, name, price, user });
      }
      cart = await cart.save();
      return res.status(200).json({ cart });
    } else {
      console.log('new Cart');
      const newCart = await Cart.create({
        user: user,
        products: { productId, quantity, price }
      });

      return res.status(200).json({
        status: 'success',
        length: newCart.products.length,
        data: {
          newCart
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong", err);
  }
});





//Get All Cart//////////////////////////////////////////////

exports.getAllCart = catchAsync(async (req, res, next) => {
  const CartItems = await Cart.find();
  res.status(200).json({
    status: 'success',
    length: CartItems.products.length,
    data: {
      CartItems
    }
  })
})



//Get Cart ////////////////////////////////////////////////////
exports.getCart = catchAsync(async (req, res, next) => {
  const CartItem = await Cart.findById(req.params.id)
  res.status(200).json({
    status: 'success',
    length: CartItem.products.length,
    data: {
      CartItem
    }
  })
})





//Delete product From the Cart/////////////////////////////////
exports.deleteItem = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const userproductId = req.params.id;
  //  console.log(userproductId);
  let cart = await Cart.findOne({ user });
  const allproducts = cart.products
  let product;
  let atualId;
  allproducts.forEach((el, i) => {
    // console.log(el.productId._id);
    product = el.productId._id.equals(userproductId);
    if (product)
      atualId = el.productId._id
    //  console.log(el.productId._id);
  })
  console.log(atualId);
  if (!atualId)
    return next(createError('Product is not in the cart', 404))
  await Cart.findById({productId:atualId})
  // await Cart.findByIdAndRemove( {productId: atualId });
  // await Cart.findByIdAndDelete({ $pull: { products : {productId: atualId }}});
  return res.status(204).json({
    status: 'success',
    //  data: cart
    //  console.log(allproducts[0].productId._id);
  })
})


//Delete My Cart ////////////////////////////////////////////////////
exports.deleteMycart = catchAsync(async (req, res, next) => {
  const cartId = req.params.id;
  await Cart.findByIdAndDelete({_id:cartId })
  res.status(204).json({
    status: 'success',
    data: null
  })
})




//Get My Cart ////////////////////////////////////////////////////

exports.getMyCart = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const cartItems = await Cart.findOne({ user: user })
  if (cartItems === null) {
    return next(createError("No items in the cart", 400))
  }
  res.status(200).json({
    status: 'success',
    length: cartItems.products.length,
    data: {
      cartItems
    }
  })
});