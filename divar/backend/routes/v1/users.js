const express = require("express");
const router = express.Router();

const { adminAuth } = require("../../middlewares/adminCheck");

const {
  getUsers,
  banUser,
  changeUserRole,
  removeUser,
} = require("../../controllers/v1/users");

router.route("/").get(adminAuth, getUsers);

router.route("/ban/:userId/xbox").post(adminAuth, banUser);

router.route("/:userId").put(adminAuth, changeUserRole);

router.route("/:userId/xbox").delete(adminAuth, removeUser);

module.exports = router;
