const express = require('express');
const usersController = require('../controllers/users_controller');

const router = express.Router();

//Route: '/api/login'

router.post('/', usersController.validateLogin);

module.exports = router;
