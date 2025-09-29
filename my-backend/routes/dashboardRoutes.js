const express = require('express');
const {
  getDashboard,
  getCourseProgress,
  updateProgress,
  completeTopic,
  getLearningStats
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getDashboard);
router.get('/progress/:courseId', protect, getCourseProgress);
router.put('/progress/:courseId', protect, updateProgress);
router.post('/progress/:courseId/complete-topic', protect, completeTopic);
router.get('/stats', protect, getLearningStats);

module.exports = router;