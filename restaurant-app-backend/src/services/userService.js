const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");

// Function to handle user registration
async function signupUser(firstName, lastName, emailId, password) {
  try {
    // Check for missing inputs
    if (!(emailId && password && firstName && lastName)) {
      throw new Error("All input needed");
    }

    const existingUser = await User.findOne({ where: { emailId } });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Decode the password and hash it before saving in the database
    const decodedPass = Buffer.from(password, "base64").toString("utf-8");
    const hashedPassword = await bcrypt.hash(decodedPass, 10);

    // Create a new user with the hashed password
    const user = await User.create({
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      emailId: emailId.toLowerCase(),
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUsers(excludeUserId) {
  try {
    const users = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: excludeUserId, // Exclude the logged-in user
        },
      },
    });

    return users;
  } catch (error) {
    throw error;
  }
}

// Function to handle user login
async function loginUser(emailId, password) {
  try {
    // Check for missing inputs
    if (!(emailId && password)) {
      throw new Error(emailId, password);
    }

    const user = await User.findOne({ where: { emailId } });

    const decodedPass = Buffer.from(password, "base64").toString("utf-8");

    if (user && (await bcrypt.compare(decodedPass, user.password))) {
      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Store the token in the user record
      user.token = token;
      user.isActive = true;
      await user.save(); // Save the user record to store the token

      return { user, token };
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw error;
  }
}

async function logoutUser(emailId) {
  try {
    const user = await User.findOne({ where: { emailId } });

    if (user) {
      // Update isActive to 0 (logged out)
      user.isActive = false;
      await user.save();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { signupUser, loginUser, logoutUser, getUsers };
