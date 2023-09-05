const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');

// ROUTE 1 : get all notes using GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

module.exports = router;
