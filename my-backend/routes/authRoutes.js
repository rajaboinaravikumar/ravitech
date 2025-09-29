const express = require('express');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const {
  register,
  login,
  googleCallback,
  getMe,
  googleLogin
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Updated Google OAuth routes
router.post('/google', googleLogin);

// Traditional Google OAuth routes (redirect flow)
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

module.exports = router;