const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  department: String, 
  age: Number,
  prefix: String,
  telephone: Number,
  address: String,
});

const User = mongoose.model("User", schema);

module.exports = User;