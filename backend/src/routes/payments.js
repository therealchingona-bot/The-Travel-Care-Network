const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { auth } = require('../middleware/auth');

router.post('/create-checkout', auth, paymentController.createPaymentIntent);
router.post('/confirm', auth, paymentController.releasePayment);

module.exports = router;
