const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updateNotePinned,
  searchNote,
} = require("../controllers/noteController");

const router = express.Router();

router.post("/add", verifyToken, addNote);
router.post("/edit/:noteId", verifyToken, editNote);
router.get("/allNotes", verifyToken, getAllNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/editNotePin/:noteId", verifyToken, updateNotePinned);
router.get("/search", verifyToken, searchNote);

module.exports = router;
