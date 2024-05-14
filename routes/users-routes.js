const usersController = require("../controllers/users-controller");
const express = require('express');

const router = express.Router();

router.get('/', usersController.getUser);

router.post('/signup', usersController.signup);

router.post('/login', usersController.login)

module.exports = router;
