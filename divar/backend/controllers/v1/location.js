const { errorResponse, successResponse } = require("../../helpers/responses");
const cities = require("../../cities/cities.json");
const neighborhoods = require("../../cities/neighborhoods.json");
const provinces = require("../../cities/provinces.json");

exports.getAllCities = async (req, res, next) => {
  try {
    successResponse(res, 200, { cities, neighborhoods, provinces });
  } catch (err) {
    next(err);
  }
};
