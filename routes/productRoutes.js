var express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController.js');
const authController = require('../Controllers/authController');
const reviewController = require('../Controllers/reviewController')
const addToCartController = require('../Controllers/addToCartController');

/* GET home page. */
router
    .route('/')
    .get(productController.getAllProduct)
    .post(authController.protect, authController.restrictTo('admin'), productController.addProduct)

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct)

router.route('/:productId/reviews')
    .post(
        authController.protect,
        reviewController.createReview
    ).get(authController.protect,
        reviewController.getReview)

router.route('/:productId/cart')
    .post(
        authController.protect,
        addToCartController.addToCart
    ) 

module.exports = router;
