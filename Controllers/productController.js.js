const Product = require('../Models/productModel');
const fs = require('fs');
const APIFeatures = require('../Util/apiFeatures');
// const products =JSON.parse(fs.readFileSync(`dev-data/products.json`))


//Home
exports.home = async (req, res, next) => {
    try {
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
        // res.status(200).render('index',{admin:false});

    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
};






//Addproduct
exports.addProduct = async (req, res, next) => {
    try {
        const newproduct = await Product.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {
                product: newproduct
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}




//GetProduct
exports.getProduct = async (req, res, next) => {
    try {
        const newproduct = await Product.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                product: newproduct
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}





//UpdateOne
exports.updateProduct = async (req, res, next) => {
    try {
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

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}





//Delete Product
exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}