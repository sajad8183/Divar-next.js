const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../helpers/responses");

exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return errorResponse(res, 401, "Token not provided");
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
      return errorResponse(res, 401, "Token is not valid");
    }
    const userId = decoded.userId;

    const user = await User.findById(userId).lean();

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    req.user = user;

    const isAdmin = user.role === "ADMIN";
    if (!isAdmin) {
      return errorResponse(
        res,
        403,
        "This route is accessible only for admins"
      );
    }

    return next();
  } catch (err) {
    next(err);
  }
};
