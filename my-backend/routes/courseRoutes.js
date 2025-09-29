import express from 'express';
import {
  getCourses,
  getCourse,
  enrollCourse,
  createCourse
} from '../controllers/courseController.js';
import { protect, instructor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/', protect, instructor, createCourse);

export default router;