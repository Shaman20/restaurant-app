const FriendService = require("../services/friendService");

exports.createFriendship = async (req, res) => {
  const { friendId } = req.body; // Get content from the request body

  if (!friendId) {
    return res.status(400).json({ message: "Friend Id required" });
  }

  try {
    const userId = req.user.id;
    const friend = await FriendService.createFriendship(userId, friendId);
    res.status(201).json({ message: 'Friendship added successfully', friend });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriendsByUserId = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the authenticated user
  
    try {
      const friends = await FriendService.getFriendsByUserId(userId);
      console.log('Friends in controller', friends)
      res.status(200).json({ message: 'Friends retrieved successfully', friends });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
