const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
