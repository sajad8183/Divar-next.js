const User = require("../../models/User");
const { successResponse, errorResponse } = require("../../helpers/responses");
const { nationalCodeValidator } = require("../../validators/v1/user");
const Post = require("../../models/Post");
const {
  createPaginationData,
  getCityData,
  getNeighborhoodData,
} = require("./post");

exports.confirmIdentity = async (req, res, next) => {
  try {
    const user = req.user;
    const { nationalCode } = req.body;

    await nationalCodeValidator.validate(
      { nationalCode },
      { abortEarly: false }
    );

    const userPhoneLastTwoDigits = user.phone.slice(-2);
    const codeLastTwoDigits = nationalCode.slice(-2);

    if (userPhoneLastTwoDigits !== codeLastTwoDigits) {
      return errorResponse(
        res,
        400,
        "Mobile number and national code do not match(last two digits should be equal)"
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        nationalCode,
        verified: true,
        verificationTime: new Date(),
      },
      { new: true }
    );

    return successResponse(res, 200, {
      user: updatedUser,
      message: "Identity Verified",
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const user = req.user;

    const posts = await Post.find({ creator: user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["creator", "category"])
      .lean();

    const totalPosts = await Post.countDocuments({ creator: user._id });

    const postsWithLocations = posts.map((post) => ({
      ...post,
      city: getCityData(post.city),
      neighborhood: getNeighborhoodData(post.neighborhood),
    }));

    return successResponse(res, 200, {
      posts: postsWithLocations,
      pagination: createPaginationData(page, limit, totalPosts),
    });
  } catch (error) {
    next(error);
  }
};
