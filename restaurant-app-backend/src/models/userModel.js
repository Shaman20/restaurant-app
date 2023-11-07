const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Friend = require('../models/friendModel')

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: "userId",
  });
  User.belongsToMany(User, { through: 'Friend' })
};



// Synchronize the model with the database (creates the "Users" table if it doesn't exist)
User.sync()
  .then(() => {
    console.log("User table created or synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing User table:", error);
  });

module.exports = User;
