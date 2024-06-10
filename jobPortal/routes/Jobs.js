const express = require('express');
const Job = require('../models/Job');

// Middleware to verify admin
const router = express.Router();

const verifyAdmin = (req, res, next) => {
  // Add your JWT verification and role checking logic here
  next();
};

// Create job
router.post('/', verifyAdmin, async (req, res) => {
  const { title, description, company, location } = req.body;

  try {
    const job = new Job({ title, description, company, location });
    await job.save();
    res.status(201).send('Job posted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
