const addToCartController = require('../Controllers/addToCartController');

var express = require('express');
var router = express.Router();



router
.route('/')
.post(addToCartController.addToCart)
.get(addToCartController.getAllCart)


module.exports = router