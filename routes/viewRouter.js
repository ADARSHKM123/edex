const viewController =require('../Controllers/viewController');
const authController=require('../Controllers/authController');
const addToCartController =require('../Controllers/addToCartController');

var express = require('express');
var router = express.Router();

router.route('/')
.get(authController.isLoggedIn,viewController.home)

router.route('/login')
.get(authController.isLoggedIn,viewController.login)

router.use(authController.protect);

router.route('/productpage/:slug')
.get(authController.isLoggedIn,viewController.product)

router.route('/:productId/cart')
.post(authController.protect,viewController.addToCart) 

 
router.route('/myacoount')
.get(authController.protect,viewController.myaccount)
 
router.route('/vegitables')
.get(authController.isLoggedIn,viewController.vegitablepage)


router.route('/fruits')
.get(authController.isLoggedIn,viewController.fruitpage)

router.route('/sauce')
.get(authController.isLoggedIn,viewController.saucepage)

router.route('/house')
.get(authController.isLoggedIn,viewController.housepage)

router.route('/mycart')
.get(authController.protect,viewController.mycart)



module.exports = router;         
