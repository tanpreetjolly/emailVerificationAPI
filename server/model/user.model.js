const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
    trim: true,
  },
  lname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  nationality: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  countryCode: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default : false
  },
});
const Userdb = mongoose.model("userdb", userSchema);

module.exports = Userdb;
