const express = require('express');
const usersController = require('../controllers/users_controller');

const router = express.Router();

router.get('/', usersController.list);

// Essa ordem importa logo o get tem que vir antes
router.get('/get', usersController.getUserByEmail);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUserById);

router.delete('/:id', usersController.deleteUserById);

module.exports = router;
