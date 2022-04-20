const addToCartController = require('../Controllers/addToCartController');
const authController = require('../Controllers/authController');

var express = require('express');
var router = express.Router();


router.use(authController.protect);

router
.route('/')
.post(addToCartController.addToCart)
.get(authController.restrictTo('admin'),addToCartController.getAllCart)

router
.route('/:id')
.get(addToCartController.getCart)

module.exports = router
