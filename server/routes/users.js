const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUserById);
router.delete('/users/:id', usersController.deleteUserById);

module.exports = router;