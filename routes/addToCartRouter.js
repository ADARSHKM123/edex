const addToCartController = require('../Controllers/addToCartController');

var express = require('express');
var router = express.Router();



router
.route('/')
.post(addToCartController.addToCart)


module.exports = router