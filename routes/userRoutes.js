const authController= require('../Controllers/authController');
const userController=require('../Controllers/userController');


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.
route('/signup')
.post(authController.signup)

router.
route('/login')
.post(authController.login)


router.
route('/')
.get(userController.getAllusers)
.post(userController.createUser)

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router;
 