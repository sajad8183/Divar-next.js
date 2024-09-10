const { errorResponse, successResponse } = require("../../helpers/responses");
const Bookmark = require("../../models/Bookmark");
const {
  getCityData,
  getNeighborhoodData,
  createPaginationData,
} = require("./post");

// Add a bookmark
exports.addBookmark = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;

    const existingBookmark = await Bookmark.findOne({
      user: user._id,
      post: postId,
    });
    if (existingBookmark) {
      return errorResponse(res, 400, "Post already bookmarked");
    }

    const newBookmark = await Bookmark.create({ user: user._id, post: postId });

    return successResponse(res, 201, {
      bookmark: newBookmark,
      message: "Post bookmarked successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Remove a bookmark
exports.removeBookmark = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;

    const deletedBookmark = await Bookmark.findOneAndDelete({
      user: user._id,
      post: postId,
    });

    if (!deletedBookmark) {
      return errorResponse(res, 404, "Bookmark not found");
    }

    return successResponse(res, 200, {
      bookmark: deletedBookmark,
      message: "Bookmark removed successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all bookmarks of the user
exports.getAllBookmarks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const user = req.user;

    const bookmarks = await Bookmark.find({ user: user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "post",
        populate: "category creator",
      })
      .lean();

    bookmarkedPosts = [];
    for (const bookmark of bookmarks) {
      if (bookmark.post) {
        const post = {
          ...bookmark.post,
          city: getCityData(bookmark.post.city),
          neighborhood: getNeighborhoodData(bookmark.post.neighborhood),
          bookmarkTime: bookmark.createdAt,
        };
        bookmarkedPosts.push(post);
      } else {
        await Bookmark.findOneAndDelete({ _id: note._id });
      }
    }

    // const postsWithLocations = bookmarkedPosts.map((post) => ({
    //   ...post,
    //   city: getCityData(post.city),
    //   neighborhood: getNeighborhoodData(post.neighborhood),
    // }));

    const totalPosts = await Bookmark.countDocuments({ user: user._id });

    return successResponse(res, 200, {
      posts: bookmarkedPosts,
      pagination: createPaginationData(page, limit, totalPosts),
    });
  } catch (err) {
    next(err);
  }
};
