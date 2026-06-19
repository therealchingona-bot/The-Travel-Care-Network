const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

router.post('/', auth, reviewController.createReview);
router.get('/:caregiverId', reviewController.getCaregiverReviews);

module.exports = router;
