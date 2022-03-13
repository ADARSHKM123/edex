var express = require('express');
var router = express.Router();
const productController = require('../Controllers/productController.js');
const authController =require('../Controllers/authController');


/* GET home page. */
router
.route('/')
.get(productController.home)
.post(productController.addProduct)

router
.route('/:id')
.get(productController.getProduct)
.patch(productController.updateProduct)
.delete(authController.protect,authController.restrictTo('admin'),productController.deleteProduct)



module.exports = router;
   