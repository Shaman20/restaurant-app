const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require('../models/userModel')

const Friend = sequelize.define(
  "Friend",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    uniqueKeys: {
      unique_friendship: {
        fields: ["userId", "friendId"],
      },
    },
  }
);


Friend.sync()
  .then((friend) => {
    console.log("Friends table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing Friends table:", error);
  });

module.exports = Friend;
