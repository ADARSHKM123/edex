const viewController =require('../Controllers/viewController');

var express = require('express');
var router = express.Router();

router.route('/')
.get(viewController.home)

router.route('/login')
.get(viewController.login)

router.route('/productpage/:slug')
.get(viewController.product)


router.route('/vegitables')
.get(viewController.vegitablepage)


router.route('/fruits')
.get(viewController.fruitpage)

router.route('/sauce')
.get(viewController.saucepage)

router.route('/house')
.get(viewController.housepage)

router.route('/mycart')
.get(viewController.mycart)

module.exports = router;         
