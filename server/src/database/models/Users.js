const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
    required: true
  },
  password: String,
  role: String,
});

const Users = model('Users', userSchema);

module.exports = Users;
