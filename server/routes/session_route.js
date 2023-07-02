const express = require('express');
const sessionsController = require('../controllers/sessions_controller');


const router = express.Router();

//Route: '/api/session'

// Rotas do sessione
router.get('/', sessionsController.list);
router.get('/:id', sessionsController.findById);
router.post('/', sessionsController.createSession);
router.put('/:id', sessionsController.updateSessionById);
router.delete('/:id', sessionsController.deleteSessionById);

module.exports = router;