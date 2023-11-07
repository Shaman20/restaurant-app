const userService = require('../services/userService');
const emailValidation = require('../helpers/validateEmail');
const verifyToken = require('../middlewares/auth')


exports.signup = async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Validate the email address
  if (!emailId ||!emailValidation.validateEmail(emailId)) {
    res.status(400).json({msg: 'Invalid Email Address'});
    return;
  }

  if (!firstName) {
    throw new Error('Firstname required')
  }

  if (!lastName) {
    throw new Error('Lastname required')
  }

  if (!password) {
    throw new Error('Password Required')
  }

  try {
    const user = await userService.signupUser(firstName, lastName, emailId, password);
    res.status(201).json({msg: 'User Added Succesfully', result: user});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

exports.getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // Assuming you have the user ID of the logged-in user
    const users = await userService.getUsers(loggedInUserId);
    
    // Filter out the logged-in user from the results
    const filteredUsers = users.filter(user => user.id !== loggedInUserId);

    res.status(200).json({ message: "Users retrieved successfully", users: filteredUsers });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};



exports.login = async (req, res) => {
  const { emailId, password } = req.body;

  // Validate the email address
  if (!emailValidation.validateEmail(emailId)) {
    res.status(400).send('Invalid email address');
    return;
  }

  if (!password){
    throw new Error('Invalid password')
  }

  try {
    const result = await userService.loginUser(emailId, password);
    res.status(200).json({msg: 'Login Successful', result: result});
  } catch (error) {
    console.error(error);
    res.status(400).json({sucess: false, message: error.message});
  }
};

exports.logout = async (req, res) => {
  try {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header missing' });
    }

    // Call the logout function from userService to handle the logout process
    const userId = req.user.emailId;

    // Call a function from userService to handle the logout process
    await userService.logoutUser(userId);

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

