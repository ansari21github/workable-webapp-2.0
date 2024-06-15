const express = require('express');

// Create a new router object

const router = express.Router();
// Import controller functions for bookmarks
const {
  addToBookmarks,
  getBookmarks,
  removeFromBookmarks,
} = require('../controllers/Bookmark');

// Define route to add a bookmark
// POST request to /add
// Calls the addToBookmarks function from the controller
router.post('/add', addToBookmarks);

// Define route to remove a bookmark
// DELETE request to /remove
// Calls the removeFromBookmarks function from the controller
router.delete("/remove", removeFromBookmarks);

// Define route to get bookmarks for a user
// GET request to /bookmarks/:email
// Calls the getBookmarks function from the controller
// :email is a URL parameter representing the user's email
router.get("/bookmarks/:email", getBookmarks);
module.exports = router;