const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trime: true,
  },
  lname: {
    type: String,
    required: true,
    trime: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Not Valid Email");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  passout:{
    type:String,
    required:true
  },
  courseGarduated:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  is_admin:Number,
  datecreated: Date,
  dateupdated: Date,
});

//model

const users = new mongoose.model("users", userSchema);

module.exports = users;
