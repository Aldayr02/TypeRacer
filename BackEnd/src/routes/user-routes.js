const router = require('express').Router();
const userController = require('../controllers/user-controllers');

const UsersController = new userController();

router.post('/login', UsersController.login);

module.exports = router;
