const path = require("path");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

// Serve static files from the React app in production
if (isProduction) {
  const buildPath = path.join(__dirname, "../client/build");
  
  // Ensure the build folder exists
  const fs = require("fs");
  if (!fs.existsSync(buildPath)) {
    console.error("Build folder not found. Make sure to build the React app.");
    process.exit(1); // Exit the process if `client/build` is missing
  }

  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

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

