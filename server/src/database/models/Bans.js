const { Schema, model } = require('mongoose');

const banSchema = new Schema({
  username: { String },
  room: { String, required },
  ip: { String },
  startIp: String,
  endIp: String,
});

const Bans = model('Bans', banSchema);

module.exports = Bans;
