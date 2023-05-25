const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
