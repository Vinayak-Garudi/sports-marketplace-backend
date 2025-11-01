const express = require('express');
const equipmentController = require('./equipment.controller');
const auth = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');

const router = express.Router();

// Public routes
router.get('/search', equipmentController.search);
router.get('/stats', equipmentController.getStats);
router.get('/', equipmentController.getAll);
router.get('/:id', equipmentController.getById);

// Protected routes - require authentication and admin role
router.post('/', auth, authorize('admin'), equipmentController.create);
router.delete('/:id', auth, authorize('admin'), equipmentController.delete);

// Additional routes
router.patch('/:id/deactivate', equipmentController.deactivate);

module.exports = router;
