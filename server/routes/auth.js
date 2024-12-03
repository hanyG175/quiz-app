const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, grade, category, subcategory } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) return res.status(400).json({ error: 'Name or email already exists' });

    // Register the user
    const newUser = new User({ name, email, grade, category, subcategory, hasTakenQuiz: false, score: 0 });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});


// Login User
router.post('/login', async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await User.findOne({ name, email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User found:", user);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      hasTakenQuiz: user.hasTakenQuiz,
      score: user.score,
      category: user.category,
      subcategory: user.subcategory,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
});


module.exports = router;
