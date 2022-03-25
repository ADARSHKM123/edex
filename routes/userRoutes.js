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
// .get(userController.login)
.post(authController.login)

router.
route('/forgotPassword')
.post(authController.forgotPassword)

router.
route('/resetPassword/:token')
.patch(authController.resetPassword)


// Protect all routes after this middleware
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);


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
 