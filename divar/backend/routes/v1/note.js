const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");

const {
  addNote,
  editNote,
  getNote,
  removeNote,
} = require("../../controllers/v1/note");

router.route("/").post(auth, addNote);
router.route("/:noteId").get(auth, getNote).put(auth, editNote).delete(auth, removeNote);

module.exports = router;
