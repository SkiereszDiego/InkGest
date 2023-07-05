const express = require('express');
const inventoryController = require('../controllers/inventory_controller');

const router = express.Router();

//Route: '/api/inventory'

router.get('/', inventoryController.list);
router.post('/', inventoryController.createItem);
router.get('/:id', inventoryController.findById);
router.put('/:id', inventoryController.updateItemById);
router.delete('/:id', inventoryController.deleteItemById);
router.patch('/update-items-quantity', inventoryController.updateItemsQuantity);

module.exports = router;