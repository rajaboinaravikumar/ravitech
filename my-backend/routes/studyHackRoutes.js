const express = require('express');
const {
  getStudyHacks,
  getStudyHack,
  createStudyHack,
  updateStudyHack,
  likeStudyHack,
  getCheatSheets,
  downloadCheatSheet,
  getCategories,
  getPopularStudyHacks
} = require('../controllers/studyHackController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getStudyHacks);
router.get('/categories', getCategories);
router.get('/popular', getPopularStudyHacks);
router.get('/cheat-sheets', getCheatSheets);
router.get('/:id', getStudyHack);

// Protected routes
router.post('/:id/like', protect, likeStudyHack);
router.post('/download-cheatsheet/:id', protect, downloadCheatSheet);

// Admin routes
router.post('/', protect, admin, createStudyHack);
router.put('/:id', protect, admin, updateStudyHack);

module.exports = router;