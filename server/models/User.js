const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  grade: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  hasTakenQuiz: { type: Boolean, required: true, default: false },
  score: { type: Number, required: true, default: 0},
});

module.exports = mongoose.model('User', UserSchema);
