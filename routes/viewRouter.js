const viewController =require('../Controllers/viewController');

var express = require('express');
var router = express.Router();

router.route('/login')
.get(viewController.login)

router.route('/productpage')
.get(viewController.product)


router.route('/vegitables')
.get(viewController.vegitablepage)

module.exports = router;         