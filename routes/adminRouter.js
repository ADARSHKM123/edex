var express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController.js');
const authController = require('../Controllers/authController');
const viewController = require('../Controllers/viewController');


router
    .route('/view-products')
    .get(productController.productlist)

router.route('/add-product')
    .get(authController.protect, authController.restrictTo('admin'), viewController.addProduct)



module.exports = router
