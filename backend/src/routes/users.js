const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// All user routes require authentication
router.use(auth);

// Generic profile
router.put('/profile', userController.updateProfile);

// Credentials
router.post('/upload-credential', upload.single('file'), (req, res, next) => {
  if (req.file) {
    req.body.file_path = req.file.path;
  }
  userController.uploadCredential(req, res, next);
});
router.get('/credentials', userController.getCredentials);

// Services (Caregiver)
router.put('/services', userController.updateServices);

// Identification (Old/Legacy if needed)
router.post('/upload-id', userController.uploadId);
router.get('/verification-status', userController.getVerificationStatus);
router.put('/background-check', userController.submitBackgroundCheck);

module.exports = router;
