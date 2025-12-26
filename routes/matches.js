const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Match routes
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);
router.delete('/:id', matchController.deleteMatch);

module.exports = router;
