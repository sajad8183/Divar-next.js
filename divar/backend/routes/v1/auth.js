const express = require("express");
const router = express.Router();

const { send, verify, getMe } = require("../../controllers/v1/auth");
const { auth } = require("../../middlewares/auth");

router.post("/send", send);
router.post("/verify", verify);
router.get("/me", auth, getMe);

module.exports = router;
