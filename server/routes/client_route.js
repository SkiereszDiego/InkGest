const express = require('express');
const clientController = require('../controllers/client_controller');

const router = express.Router();

//Route: '/api/client'

// Rotas do cliente
router.get('/', clientController.list);
router.get('/:id', clientController.findById);
router.post('/', clientController.createItem);
router.put('/:id', clientController.updateItemById);
router.delete('/:id', clientController.deleteItemById);

module.exports = router;