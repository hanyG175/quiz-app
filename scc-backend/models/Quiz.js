const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const SubjectSchema = new mongoose.Schema({
  name: String,
  questions: [QuestionSchema]
});

const QuizSchema = new mongoose.Schema({
  category: String,  // For example: "Science", "Languages", etc.
  subjects: [SubjectSchema]  // Array of subjects like Physics, Maths, etc.
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
