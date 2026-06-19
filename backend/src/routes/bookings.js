const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const paymentController = require('../controllers/paymentController');
const documentController = require('../controllers/documentController');
const { auth } = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getBookings);
router.get('/:id', auth, bookingController.getBookingById);
router.put('/:id/status', auth, bookingController.updateBookingStatus);
router.patch('/:id/status', auth, bookingController.updateBookingStatus);

router.post('/:id/payment', auth, paymentController.createPaymentIntent);
router.post('/:id/release-payment', auth, paymentController.releasePayment);
router.post('/:id/sign-nda', auth, documentController.signDocument);

module.exports = router;
