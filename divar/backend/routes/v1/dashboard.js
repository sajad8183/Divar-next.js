const express = require("express");
const router = express.Router();

const { adminAuth } = require("../../middlewares/adminCheck");
const { getDashboard } = require("../../controllers/v1/dashboard");

router.route("/").get(adminAuth, getDashboard);

module.exports = router;
