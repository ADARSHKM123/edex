const async = require('hbs/lib/async');
const catchAsync = require('../Util/catchAsync');
const Product =require('../Models/productModel');
const Cart = require('../Models/cartItemsModel');


//Home /////////////////////////////////////
exports.home = catchAsync(async(req,res,next)=>{
  const products = await Product.find();
const newProduct = products.filter(el=>el.bestseller === true)
 console.log(newProduct);
  res.status(200).render('index',{admin:false,login:true,products:newProduct})
});


//LoginPage //////////////////////////////////
exports.login = catchAsync(async(req, res, next) => {
    res.status(200).render('users/login');
  });


//Product //////////////////////////////////
exports.product = catchAsync(async(req, res, next) => {
  const product = await Product.findOne({slug:req.params.slug}).populate({
    path:'reviews',
    fields:'review rating user'
})
console.log(product);
    res.status(200).render('products/product',{admin:false,login:true,product});
  });

  
//Fruit Page ////////////////////////////////
exports.myaccount = catchAsync(async(req, res, next) => {
  res.status(200).render('users/account',{admin:false,login:true});
});

  
  
//productPage ////////////////////////////////
exports.vegitablepage = catchAsync(async(req, res, next) => {
  const products = await Product.aggregate([
    {
      $match:{ category:{ $eq:'vegetable'}}
    }
  ])
  console.log(products);
    res.status(200).render('products/vegitables',{admin:false,login:true,products});
  });
  

//Fruit Page ////////////////////////////////
exports.fruitpage = catchAsync(async(req, res, next) => {
  const products = await Product.aggregate([
    {
      $match:{ category:{ $eq:'fruit'}}
    }
  ])
  res.status(200).render('products/fruits',{admin:false,login:true,products});
});


//Fruit Page ////////////////////////////////
exports.saucepage = catchAsync(async(req, res, next) => {
  const products = await Product.aggregate([
    {
      $match:{ category:{ $eq:'Sauces & Oils'}}
    }
  ])
  res.status(200).render('products/sauce',{admin:false,login:true,products});
});
 

//Fruit Page ////////////////////////////////
exports.housepage = catchAsync(async(req, res, next) => {
  const products = await Product.aggregate([
    {
      $match:{ category:{ $eq:'Household Supplies'}}
    }
  ])
  res.status(200).render('products/house',{admin:false,login:true,products});
});


exports.mycart = catchAsync(async(req, res, next) => {
  res.status(200).render('users/mycart',{admin:false,login:true});
});




exports.addToCart = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  console.log('yesssssssssssssssssssssssssssssssssssssssssssssssssssss');
  if (!req.body.productId) req.body.productId = req.params.productId;
  if(!req.body.quantity){
    req.body.quantity = 1;
  }
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
