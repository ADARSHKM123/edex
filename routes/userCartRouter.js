const authController = require('../Controllers/authController');
const addToCartController = require('../Controllers/addToCartController');

var express = require('express');
var router = express.Router();


router.use(authController.protect);


router.route('/')
.get(addToCartController.getMyCart);

module.exports = router
  