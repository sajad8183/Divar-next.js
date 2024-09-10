const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares/auth");
const { confirmIdentity, getMyPosts } = require("../../controllers/v1/user");
const { getAllBookmarks } = require("../../controllers/v1/bookmark");
const { getAllNotes } = require("../../controllers/v1/note");

router.route("/posts").get(auth, getMyPosts);
router.route("/identity").post(auth, confirmIdentity);
router.route("/bookmarks").get(auth, getAllBookmarks);
router.route("/notes").get(auth, getAllNotes);

module.exports = router;
