var express = require('express');
var router = express.Router();
const indexController = require('../Controllers/indexController');


/* GET home page. */
router.route('/').get(indexController.home)
module.exports = router;
