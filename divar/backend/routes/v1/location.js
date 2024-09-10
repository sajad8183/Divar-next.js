const express = require("express");
const router = express.Router();

const { getAllCities } = require("../../controllers/v1/location");

// category
router.route("/").get(getAllCities);

module.exports = router;
