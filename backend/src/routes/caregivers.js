const express = require('express');
const router = express.Router();
const caregiverController = require('../controllers/caregiverController');
const { auth, authorize } = require('../middleware/auth');

const authController = require('../controllers/authController');

router.get('/', caregiverController.getAllCaregivers);
router.post('/', authController.register);
router.get('/:id', caregiverController.getCaregiverById);
router.put('/profile', auth, authorize(['caregiver']), caregiverController.updateProfile);
router.post('/credentials', auth, authorize(['caregiver']), caregiverController.uploadCredential);
router.get('/me/credentials', auth, authorize(['caregiver']), caregiverController.getOwnCredentials);
router.put('/:id', auth, authorize(['caregiver']), caregiverController.updateProfile);

module.exports = router;
