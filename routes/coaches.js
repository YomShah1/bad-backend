const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

// Coach routes
router.get('/', coachController.getAllCoaches);
router.get('/:id', coachController.getCoachById);
router.post('/', coachController.createCoach);
router.put('/:id', coachController.updateCoach);
router.delete('/:id', coachController.deleteCoach);

module.exports = router;
