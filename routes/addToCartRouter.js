const addToCartController = require('../Controllers/addToCartController');
const authController = require('../Controllers/authController');

var express = require('express');
var router = express.Router();


router.use(authController.protect);

router
.route('/')
.post(addToCartController.addToCart)
.get(addToCartController.getAllCart)

router
.route('/:id')
.get(addToCartController.getCart)


router.route('/deleteCart/:id')
.delete(addToCartController.deleteItem)


router.route('/mycart')
.get(addToCartController.getMyCart)

module.exports = router
