var express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController.js');
const authController =require('../Controllers/authController');



router
.route('/view-products')
.get(productController.productlist)


module.exports = router