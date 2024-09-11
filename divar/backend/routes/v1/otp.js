const express = require("express");
const controller = require("../../controllers/v1/otp");

const router = express.Router();

router.route("/send-code").post(controller.send);
router.route("/verify-code").post(controller.verify);

module.exports = router;
