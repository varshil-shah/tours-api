const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
    maxlength: [30, 'Name must have less or equal then 30 characters'],
    validate: {
      validator: function (value) {
        return /[A-Za-z]/.test(value);
      },
      message: 'Please enter a valid name',
    },
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email address'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: [true, 'Please provde a password'],
    validate: {
      validator: function (value) {
        return /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/.test(
          value
        );
      },
      message:
        'A password must be of 8 characters long and it should contain number, uppercase and lowercase character, special character',
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
