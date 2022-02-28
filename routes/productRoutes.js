var express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController.js');


/* GET home page. */
router
.route('/')
.get(productController.home)
.post(productController.addProduct);


module.exports = router;
  