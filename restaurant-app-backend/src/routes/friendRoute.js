const express = require("express");
const router = express.Router();
const FriendController = require('../controllers/friendController');
const verifyToken = require('../middlewares/auth');

router.post('/add-friend', verifyToken, FriendController.createFriendship)
router.get('/get-friend', verifyToken, FriendController.getFriendsByUserId);

module.exports = router;
