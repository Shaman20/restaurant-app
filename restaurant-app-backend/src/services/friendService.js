const Friend = require("../models/friendModel");
const User = require("../models/userModel");
const sequelize = require("../models/db");

class FriendService {
  async createFriendship(userId, friendId) {
    try {
      if (!userId || !friendId) {
        throw new Error("All input needed");
      }

      const existingFriendship = await Friend.findOne({
        where: {
          userId: userId,
          friendId: friendId,
        },
      });

      if (existingFriendship) {
        throw new Error("Friendship already exists");
      }

      // If it doesn't exist, create the friendship
      const friend = await Friend.create({
        userId: userId,
        friendId: friendId,
      });

      return friend;
    } catch (error) {
      throw new Error("Failed to add friend.");
    }
  }

  async getFriendsByUserId(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const friends = await sequelize.query(
        "SELECT u.firstName as friend_fname, u.lastName as friend_lastname FROM friends AS f INNER JOIN users AS u ON f.friendId = u.id WHERE f.userId = :userId",
        { replacements: { userId }, type: sequelize.QueryTypes.SELECT }
      );
      return friends;
    } catch (error) {
      throw new Error("Failed to fetch friends.");
    }
  }
}

module.exports = new FriendService();
