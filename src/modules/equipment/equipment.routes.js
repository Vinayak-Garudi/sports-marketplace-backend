const express = require('express');
const equipmentController = require('./equipment.controller');
const equipmentValidation = require('./equipment.validation');
const auth = require('../../middleware/auth');

const router = express.Router();

// Public routes (if any)
router.get('/search', equipmentController.search);
router.get('/stats', equipmentController.getStats);

// Protected routes - require authentication
router.use(auth);

// CRUD operations
router
  .route('/')
  .get(equipmentController.getAll)
  .post(equipmentValidation.validateCreate, equipmentController.create);

router
  .route('/:id')
  .get(equipmentController.getById)
  .put(equipmentValidation.validateUpdate, equipmentController.update)
  .delete(equipmentController.delete);

// Additional routes
router.patch('/:id/deactivate', equipmentController.deactivate);

module.exports = router;