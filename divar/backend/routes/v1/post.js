const express = require("express");
const router = express.Router();

const {
  createPost,
  deletePost,
  editPost,
  getPost,
  getAllPosts,
  postStatusCheck,
  getAllPublishedPosts,
} = require("../../controllers/v1/post");
const { adminAuth } = require("../../middlewares/adminCheck");

const { multerStorage } = require("../../utils/multerConfig");
const { loggedIn } = require("../../middlewares/loggedIn");
const { auth } = require("../../middlewares/auth");
const upload = multerStorage("public/images/posts");

router.route("/:categoryId").post(auth, upload.array("pics"), createPost);

router.route("/").get(getAllPublishedPosts);
router.route("/all").get(adminAuth, getAllPosts);

router
  .route("/:postId")
  .get(loggedIn, getPost)
  .put(auth, upload.array("pics"), editPost);
  
router.route("/:postId").delete(auth, deletePost);

router.route("/:postId/status").put(adminAuth, postStatusCheck);

module.exports = router;
