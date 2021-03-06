const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
  name: { 
    type:String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;