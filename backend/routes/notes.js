const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : get all notes using GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//ROUTE 2: add a note using POST "/api/notes/addnote" require login
router.post(
  '/addnote',
  fetchUser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter valid description').isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(501).send(error);
    }
  }
);

//ROUTE 3 : update a note POST : /api/notes/updatenote login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send('Not found');
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send('Not allowed');
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  return res.json({ note });
});

module.exports = router;
