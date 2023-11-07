const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./userModel"); // Import the User model

const Post = sequelize.define(
  "Post",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

// Define the association between Post and User
Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: "userId" });
};

// Synchronize the model with the database
Post.sync()
  .then(() => {
    console.log("Post table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing Post table:", error);
  });

module.exports = Post;
