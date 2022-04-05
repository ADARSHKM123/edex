const async = require('hbs/lib/async');
const catchAsync = require('../Util/catchAsync');
const Product =require('../Models/productModel');



//Home /////////////////////////////////////
exports.home = catchAsync(async(req,res,next)=>{
  const products = await Product.find();
  // const producers = [
  //   {
  //     name:"Adarsh",
  //     image:"8.jpg",
  //     price:12.0
  //   },
  //   {
  //     name:"kaef",
  //     image:"6.jpg",
  //     price:22.0
  //   }
  // ]
  res.status(200).render('index',{admin:false,login:true,products:products})
});


//LoginPage //////////////////////////////////
exports.login = catchAsync(async(req, res, next) => {
    res.status(200).render('users/login');
  });


//Product //////////////////////////////////
exports.product = catchAsync(async(req, res, next) => {
    res.status(200).render('products/product',{admin:false,login:true});
  });
  
  
//productPage ////////////////////////////////
exports.vegitablepage = catchAsync(async(req, res, next) => {
  const products = await Product.find();
    res.status(200).render('products/vegitables',{admin:false,login:true,products});
  });
  

//Fruit Page ////////////////////////////////
exports.fruitpage = catchAsync(async(req, res, next) => {
  res.status(200).render('products/fruits',{admin:false,login:true});
});


//Fruit Page ////////////////////////////////
exports.saucepage = catchAsync(async(req, res, next) => {
  res.status(200).render('products/sauce',{admin:false,login:true});
});


//Fruit Page ////////////////////////////////
exports.housepage = catchAsync(async(req, res, next) => {
  res.status(200).render('products/house',{admin:false,login:true});
});


exports.mycart = catchAsync(async(req, res, next) => {
  res.status(200).render('users/mycart',{admin:false,login:true});
});