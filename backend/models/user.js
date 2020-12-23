const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  username: {
    type: String,
    required: [true, 'User is required field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
  },
});

module.exports = mongoose.model('User', UserSchema);
