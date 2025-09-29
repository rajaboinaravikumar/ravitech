const express = require('express');
const {
  generateCertificate,
  getUserCertificates,
  downloadCertificate,
  verifyCertificate,
  shareCertificate
} = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate', protect, generateCertificate);
router.get('/my-certificates', protect, getUserCertificates);
router.get('/download/:certificateId', protect, downloadCertificate);
router.post('/verify', verifyCertificate); // Public route for verification
router.post('/share/:certificateId', protect, shareCertificate);

module.exports = router;