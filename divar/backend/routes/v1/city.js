const express = require("express");
const controller = require("../../controllers/v1/city");

const router = express.Router();

router.route("/").post(controller.create).get(controller.getAll);
router.route("/popular").get(controller.popular);

module.exports = router;
