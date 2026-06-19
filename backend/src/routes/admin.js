const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(auth);
router.use(authorize(['admin']));

// 1. Stats
router.get('/stats', adminController.getStats);

// 2. Traveler Requests
router.get('/requests', adminController.getTravelerRequests);
router.get('/requests/:id', adminController.getTravelerRequestById);
router.put('/requests/:id/status', adminController.updateTravelerRequestStatus);
router.post('/requests/:id/notes', adminController.addTravelerRequestNote);

// 3. Providers
router.get('/providers', adminController.getProviders);
router.get('/providers/:id', adminController.getProviderById);
router.put('/providers/:id/status', adminController.updateProviderStatus);
router.post('/providers/:id/notes', adminController.addProviderNote);

// 4. Bookings
router.get('/bookings', adminController.getBookings);
router.put('/bookings/:id/status', adminController.updateBookingStatus);
router.put('/bookings/:id/payment', adminController.updateBookingPayment);

// 5. Matching
router.post('/match', adminController.matchProvider);

// 6. Users
router.get('/users', adminController.getUsers);

// 7. Credentials
router.post('/credentials/:id/verify', adminController.verifyCredential);

module.exports = router;
