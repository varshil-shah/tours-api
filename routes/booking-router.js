const express = require('express');

const bookingController = require('../controllers/booking-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
