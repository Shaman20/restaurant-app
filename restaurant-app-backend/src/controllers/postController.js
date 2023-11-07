const postService = require("../services/postService");

exports.createPost = async (req, res) => {
  const { content } = req.body; // Get content from the request body

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const userId = req.user.id;
    console.log("User information in post controller", req.user.id);
    const post = await postService.createPost(content, userId);
    res
      .status(201)
      .json({ message: "New Post Added", result: post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const userId = req.user.id;
  try {
    const posts = await postService.getPosts(userId);
    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving posts", error: error.message });
  }
};

exports.incrementLikes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Call the service function to increment likes
    const updatedPost = await postService.incrementLikes(id.slice(1));

    res.status(200).json({ message: 'Likes incremented successfully', post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing likes', error: error.message });
  }
};

exports.decrementLikes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Call the service function to decrement likes
    const updatedPost = await postService.decrementLikes(id.slice(1));
    console.log(updatedPost)
    res.status(200).json({ message: 'Likes decremented successfully', post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error decrementing likes', error: error.message });
  }
};
