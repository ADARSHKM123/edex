const Product = require('../Models/productModel');
const fs = require('fs');

const products =JSON.parse(fs.readFileSync(`dev-data/products.json`))

exports.home = (req,res,next)=>{
    res.status(200).json({
        results:products.length,
        data:{
            products
        }
    })
}

exports.addProduct=(req,res,next)=>{
  const product = Product.create(req.body)
}

