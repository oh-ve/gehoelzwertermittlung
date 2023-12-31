const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

// Simplified token creation function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign up user
const signUpUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all users
const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signUpUser,
  getAllUsers,
  getUser,
  deleteAllUsers,
  deleteUser,
};
