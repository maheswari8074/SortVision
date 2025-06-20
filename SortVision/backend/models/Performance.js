const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  algorithm: String,
  arraySize: Number,
  dataPattern: String,
  comparisons: Number,
  swaps: Number,
  durationMs: Number,
  timestamp: String,
});

module.exports = mongoose.model('Performance', performanceSchema);
