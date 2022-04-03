const async = require('hbs/lib/async');
const catchAsync = require('../Util/catchAsync');

//Home /////////////////////////////////////
exports.home = catchAsync(async(req,res,next)=>{
  res.status(200).render('index',{admin:false,login:true})
})


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
    res.status(200).render('products/vegitables',{admin:false,login:true});
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