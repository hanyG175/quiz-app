const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const CLIENT_URL = "https://quiz-app-vhpg.onrender.com";

// Forward all unknown requests to the client
app.get('*', (req, res) => {
    res.redirect(`${CLIENT_URL}${req.originalUrl}`);
});

app.use(cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If you're using cookies or authentication
}));

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

