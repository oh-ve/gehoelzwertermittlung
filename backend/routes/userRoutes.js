const express = require("express");
const {
  loginUser,
  signUpUser,
  getAllUsers,
  getUser,
  deleteAllUsers,
  deleteUser,
} = require("../controllers/userControllers");

const app = express.Router();

// Login route
app.post("/login", loginUser);

// Signup route
app.post("/signup", signUpUser);

// Get all users route
app.get("/users", getAllUsers);

// Get a single user by ID route
app.get("/:id", getUser);

// Delete all users route
app.delete("/delete", deleteAllUsers);

// Delete a single user by ID route
app.delete("/:id", deleteUser);

module.exports = app;
