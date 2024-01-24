const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: Number, required: true },
  avatar: {type: String, required: true},
  phonenumber: {type: Number, required: true},
},{ versionKey: false });

module.exports = mongoose.model('Seat', userSchema);