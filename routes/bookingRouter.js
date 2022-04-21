const express = require('express');
const bookingController = require('../Controllers/bookingController');
<<<<<<< HEAD
const authController = require('../Controllers/authController');
=======
const authController = require('../Controllers/authController');
>>>>>>> 98af75fe089ae1c2a36d8359c301a83c292ca066

const router = express.Router();

router.use(authController.protect);
router.get('/checkout-session/:cartId', bookingController.getCheckoutSession)

module.exports = router;
