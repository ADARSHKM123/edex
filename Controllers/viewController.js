const catchAsync = require('../Util/catchAsync');


exports.login = catchAsync(async(req, res, next) => {
    res.status(200).render('users/login');
  });
  
exports.product = catchAsync(async(req, res, next) => {
    res.status(200).render('products/product',{admin:false,login:true});
  });
  
  
exports.vegitablepage = catchAsync(async(req, res, next) => {
    res.status(200).render('products/vegitables',{admin:false,login:true});
  });
  
