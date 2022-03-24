const Product = require('../Models/productModel');
const fs = require('fs');
const APIFeatures = require('../Util/apiFeatures');
var createError = require('http-errors');
const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');
// const products =JSON.parse(fs.readFileSync(`dev-data/products.json`))


//Home
exports.home =catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Product.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const products = await features.query;

        // SEND RESPONSE
        // res.status(200).json({
        //     status: 'success',
        //     results: products.length,
        //     data: {
        //         products 
        //     }
        // }); 
        res.status(200).render('index',{admin:false,login:true})
});


//Addproduct
exports.addProduct =catchAsync(async (req, res, next) => {
        const newproduct = await Product.create(req.body);

        res.status(200).json({
            status: "Success",
            data: {
                product: newproduct
            }
        });
}); 


//GetProduct
exports.getProduct = catchAsync(async(req, res, next) => {

        const newproduct = await Product.findById(req.params.id);
        res.status(200).json({ 
            status: "Success",
            data: {
                product: newproduct
            }
        })

});



//UpdateOne
exports.updateProduct = catchAsync(async (req, res, next) => {
   
        const newproduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!newproduct) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: newproduct
            }
        });
});



//Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  
        await Product.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        })

});


exports.productlist = catchAsync(async (req, res, next) => {
  
   res.status(200).render('admin/view-products',{admin:true});

});



