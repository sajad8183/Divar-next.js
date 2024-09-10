const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { errorResponse } = require("../helpers/responses");

exports.loggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      req.user = false;
      return next();
    }

    const tokenArray = token.split(" ");
    const tokenValue = tokenArray[1];

    if (tokenArray[0] !== "Bearer") {
      return errorResponse(
        res,
        401,
        `Write [Bearer ] at the start of the token`
      );
    }

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    if (!decoded) {
      req.user = false;
      return next();
    }
    const userId = decoded.userId;

    const user = await User.findById(userId).lean();
    if (!user) {
      req.user = false;
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
