const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/signin', authController.login);
router.get('/me', auth, authController.getMe);
router.get('/profile', auth, authController.getMe);

module.exports = router;
