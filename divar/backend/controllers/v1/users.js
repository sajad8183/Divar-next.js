const { successResponse, errorResponse } = require("../../helpers/responses");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Ban = require("../../models/Ban");
const { createPaginationData } = require("./post");
const { roleValidator } = require("../../validators/v1/user");

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const usersWithPostsCount = [];
    for (const user of users) {
      const postsCount = await Post.countDocuments({ creator: user._id });
      usersWithPostsCount.push({ ...user, postsCount });
    }

    const totalUsers = await User.countDocuments();

    return successResponse(res, 200, {
      users:usersWithPostsCount,
      
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
      message: "successfull",
    });
  } catch (error) {
    next(error);
  }
};

exports.changeUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if(user.phone === "09046417084"){
      return errorResponse(res, 403, "you can't change the role of super admin");

    }
    await roleValidator.validate({ role }, { abortEarly: false });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        role,
      },
      { new: true }
    );

    return successResponse(res, 200, {
      user: updatedUser,
      message: "Role changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (user.role === "ADMIN") {
      return errorResponse(res, 403, "You cannot remove an admin");
    }

    await Post.deleteMany({ creator: userId });
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    return successResponse(res, 200, {
      user: deletedUser,
      message: "User removed successfully, user and posts removed",
    });
  } catch (error) {
    next(error);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    
    if (user.role === "ADMIN") {
      return errorResponse(res, 403, "You cannot ban an admin");
    }

    const removedPosts = await Post.deleteMany({ creator: userId });
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    await Ban.create({ phone: user.phone });

    return successResponse(res, 200, {
      user: deletedUser,
      message: "User banned successfully, user and posts removed",
    });
  } catch (error) {
    next(error);
  }
};
