const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');

// Court routes
router.get('/', courtController.getAllCourts);
router.get('/:id', courtController.getCourtById);
router.post('/', courtController.createCourt);
router.put('/:id', courtController.updateCourt);
router.delete('/:id', courtController.deleteCourt);

// Court booking routes
router.get('/:courtId/availability', courtController.checkAvailability);
router.post('/:courtId/book', courtController.bookCourt);

module.exports = router;
