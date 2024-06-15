const express = require('express');
// Create a new router object
const router = express.Router();

// Import controller functions for jobs applied
const {
  addToJobsApplied,
  getJobsApplied,
} = require('../controllers/JobsApplied');

// Define route to add a job to the applied list
// POST request to /add
// Calls the addToJobsApplied function from the controller
router.post('/add', addToJobsApplied);
// Define route to get applied jobs for a user
// GET request to /jobsApplies/:email
// Calls the getJobsApplied function from the controller
// :email is a URL parameter representing the user's email
router.get("/jobsApplies/:email",  getJobsApplied);
module.exports = router;