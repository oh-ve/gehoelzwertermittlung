const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating a custom static method

userSchema.statics.signup = async function (username, password) {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
  });

  return user;
};

// static custom login method

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("User unbekannt");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Passwort falsch");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema, "users");
