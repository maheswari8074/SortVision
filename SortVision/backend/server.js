require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Performance = require('./models/Performance');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed', err));

// POST endpoint to log performance
app.post('/api/log', async (req, res) => {
  try {
    const data = new Performance(req.body);
    await data.save();
    res.status(201).send('✅ Data logged');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Failed to log data');
  }
});

// (Optional) GET endpoint to fetch history
app.get('/api/history', async (req, res) => {
  const data = await Performance.find().sort({ timestamp: -1 }).limit(100);
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));