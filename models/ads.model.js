const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {type: Number, required: true},
  photo: {type: String, required: true},
  price:{type: Number, required: true},
  location:{type: String, required: true},
  author:{type: String, required: true},
},{ versionKey: false });

module.exports = mongoose.model('Ad', adSchema);