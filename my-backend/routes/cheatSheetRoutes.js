const express = require('express');
const {
  getCheatSheets,
  getCheatSheet,
  createCheatSheet,
  updateCheatSheet,
  deleteCheatSheet
} = require('../controllers/cheatSheetController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getCheatSheets);
router.get('/:id', getCheatSheet);

// Admin routes
router.post('/', protect, admin, createCheatSheet);
router.put('/:id', protect, admin, updateCheatSheet);
router.delete('/:id', protect, admin, deleteCheatSheet);

module.exports = router;
