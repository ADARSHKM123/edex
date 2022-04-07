const viewController =require('../Controllers/viewController');
const authController=require('../Controllers/authController');

var express = require('express');
var router = express.Router();

router.route('/')
.get(viewController.home)

router.route('/login')
.get(viewController.login)

router.use(authController.protect);

router.route('/productpage/:slug')
.get(viewController.product)
 
router.route('/myacoount')
.get(viewController.myaccount)

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
