const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

// Middleware to verify user
const verifyUser = (req, res, next) => {
  // Add your JWT verification and role checking logic here
  next();
};

// Apply for a job
router.post('/', verifyUser, async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user.userId; // Get userId from verified token

  try {
    const application = new Application({ jobId, userId });
    await application.save();
    res.status(201).send('Application submitted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
