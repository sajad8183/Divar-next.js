const { successResponse } = require("../../helpers/responses");
const Article = require("../../models/Article");
const Post = require("../../models/Post");
const User = require("../../models/User");
const { getCityData, getNeighborhoodData } = require("./post");

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(5).lean();

    const usersWithPostsCount = [];
    for (const user of users) {
      const postsCount = await Post.countDocuments({ creator: user._id });
      usersWithPostsCount.push({ ...user, postsCount });
    }

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate(["creator", "category"])
      .lean();

    const postsWithLocations = posts.map((post) => ({
      ...post,
      city: getCityData(post.city),
      neighborhood: getNeighborhoodData(post.neighborhood),
    }));

    const postsCount = await Post.countDocuments();
    const usersCount = await User.countDocuments();
    const articlesCount = await Article.countDocuments();

    return successResponse(res, 200, {
      users: usersWithPostsCount,

      posts: postsWithLocations,
      postsCount,
      usersCount,
      articlesCount,
      message: "successfull",
    });
  } catch (error) {
    next(error);
  }
};
