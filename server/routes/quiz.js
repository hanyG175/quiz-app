const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to Verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Submit Answers
router.post('/submit-score', async (req, res) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
        // Verify the token
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const { score } = req.body; // Expect score from the frontend.
  
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        if(user.hasTakenQuiz) return res.status(400).json({ error: 'User has already taken the quiz' });
        // Update the user's score
        user.score = score;
        user.hasTakenQuiz = true;
        await user.save();
  
        res.status(200).json({ 
          message: 'Score updated successfully',
          score: user.score, 
          hasTakenQuiz: user.hasTakenQuiz });
          
    }   catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
          }
          res.status(500).json({ error: 'Failed to update score' });
        }
    }
  );
  
// Leaderboard (ranked list of users)
router.get('/leaderboard', async (req, res) => {
    try {
      const users = await User.find().sort({ score: -1 }).select('name email grade category subcategory score hasTakenQuiz');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
  });

const { Parser } = require('json2csv');

router.get('/export-scores', async (req, res) => {
try {
    const users = await User.find().sort({ grade: -1 }).select('name email grade category subcategory score');
    const fields = ['name', 'email', 'grade', 'category', 'subcategory', 'score'];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('competition_scores.csv');
    return res.send(csv);
} catch (error) {
    res.status(500).json({ error: 'Failed to export scores' });
}
});


module.exports = router;
