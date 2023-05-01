const express = require('express');
const usersController = require('../controllers/users_controller');

const router = express.Router();

router.get('/', usersController.list);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;
