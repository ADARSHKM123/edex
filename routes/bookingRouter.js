const express = require('express');
const bookingController = require('../Controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.get('/checkout-session/:cartId', bookingController.getCheckoutSession)

module.exports = router;