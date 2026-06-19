const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { auth } = require('../middleware/auth');

router.get('/conversations', auth, messageController.getConversations);
router.get('/:bookingId', auth, messageController.getMessagesByBooking);
router.post('/:bookingId', auth, messageController.sendMessage);
router.post('/', auth, messageController.sendMessage);

module.exports = router;
