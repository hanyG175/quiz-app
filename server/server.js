const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());


// Serve the React build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle all other routes to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const quizRoutes = require('./routes/quiz');
app.use('/api/quiz', quizRoutes);

