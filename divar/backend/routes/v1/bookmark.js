const express = require("express");
const router = express.Router();

const {
  addBookmark,
  removeBookmark,
} = require("../../controllers/v1/bookmark");
const { auth } = require("../../middlewares/auth");

router.route("/:postId").post(auth, addBookmark).delete(auth, removeBookmark);

module.exports = router;
