const viewController = require('../Controllers/viewController');
const authController = require('../Controllers/authController');
const addToCartController = require('../Controllers/addToCartController');

var express = require('express');
var router = express.Router();

router.route('/')
    .get(authController.isLoggedIn, viewController.home)

router.route('/login')
    .get(authController.isLoggedIn, viewController.login)

// router.use(authController.protect);

router.route('/productpage/:slug')
    .get(authController.isLoggedIn, viewController.product)

router.route('/:productId/cart')
    .post(authController.protect, viewController.addToCart)

router.route('/myacoount')
    .get(viewController.myaccount)

router.route('/vegitables')
    .get(authController.isLoggedIn, viewController.vegitablepage)

router.route('/household')
    .get(authController.isLoggedIn, viewController.householdpage)

router.route('/personalCare')
    .get(authController.isLoggedIn, viewController.personalcarepage)

router.route('/kitchen')
    .get(authController.isLoggedIn, viewController.kitchenpage)


router.route('/fruits')
    .get(authController.isLoggedIn, viewController.fruitpage)

router.route('/sauce')
    .get(authController.isLoggedIn, viewController.saucepage)

router.route('/house')
    .get(authController.isLoggedIn, viewController.housepage)

router.route('/mycart')
    .get(viewController.mycart)



module.exports = router;         
