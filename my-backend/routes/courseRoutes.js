const express = require('express');
const {
  getCourses,
  getCourse,
  enrollCourse,
  createCourse
} = require('../controllers/courseController');
const { protect, instructor } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/', protect, instructor, createCourse);

module.exports = router;