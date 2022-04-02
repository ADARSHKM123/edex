const authController = require('../Controllers/authController');
const addToCartController = require('../Controllers/addToCartController');
const reviewController =require('../Controllers/reviewController');

var express = require('express');
var router = express.Router();


router.use(authController.protect);


router.route('/')
.get(addToCartController.getMyCart);


router.route('/deleteCartItem/:id')
.get(addToCartController.deleteItem)

router.route('/deleteCart/:id')
.delete(addToCartController.deleteMycart)




module.exports = router
  