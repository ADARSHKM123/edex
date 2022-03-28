const Product = require('../Models/productModel');
const fs = require('fs');
const APIFeatures = require('../Util/apiFeatures');
const createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');
const handle = require('../Controllers/handlefactory');


//Home
exports.home =catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Product.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const products = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products  
            }
        }); 
        // res.status(200).render('index',{admin:false,login:true})
        // res.status(200).render('product',{admin:false,login:true})
});

exports.getProduct = handle.getOne(Product,{ path:'reviews' });
exports.addProduct = handle.createOne(Product);
exports.getAllProduct = handle.getAll(Product);
exports.updateProduct = handle.updateOne(Product);
exports.deleteProduct = handle.deleteOne(Product);


exports.productlist = catchAsync(async (req, res, next) => {
   res.status(200).render('admin/view-products',{admin:true});
});