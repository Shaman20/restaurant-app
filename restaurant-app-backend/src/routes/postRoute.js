const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const verifyToken = require("../middlewares/auth");

router.post("/feed", verifyToken, PostController.createPost);
router.get("/feed", verifyToken, PostController.getPost);
router.post("/likes:id", verifyToken, PostController.incrementLikes);
router.delete("/likes:id", verifyToken, PostController.decrementLikes);

module.exports = router;
