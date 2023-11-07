const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');


// Define routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', verifyToken, UserController.logout);
router.get('/get-users', verifyToken, UserController.getUsers)

module.exports = router;
