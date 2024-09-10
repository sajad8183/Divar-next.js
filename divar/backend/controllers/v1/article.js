const { errorResponse, successResponse } = require("../../helpers/responses");

const Article = require("../../models/Article");
const ArticleCategory = require("../../models/ArticleCategory");

const fs = require("fs");
const path = require("path");

const {
  articleValidator,
  articleCategoryValidator,
  articleCategoryUpdateValidator,
} = require("../../validators/v1/article");

// Fetch all articles
exports.fetchAllArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find({ published: true })
      .skip(skip)
      .limit(limit);

    const totalArticlesCount = await Article.countDocuments({
      published: true,
    });
    const totalPages = Math.ceil(totalArticlesCount / limit);

    return successResponse(res, 200, {
      articles,
      currentPage: page,
      totalPages,
      totalArticles: totalArticlesCount,
    });
  } catch (err) {
    next(err);
  }
};

function escapeRegex(text) {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// Search articles
exports.searchArticles = async (req, res, next) => {
  try {
    const { s } = req.query;
    if (!s) {
      return errorResponse(res, 400, "Please provide a search text");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const regex = new RegExp(escapeRegex(s), "i");
    const articles = await Article.find({
      $or: [{ title: regex }, { body: regex }],
      published: true,
    })
      .skip(skip)
      .limit(limit);

    const totalArticlesCount = await Article.countDocuments({
      $or: [{ title: regex }, { body: regex }],
      published: true,
    });
    const totalPages = Math.ceil(totalArticlesCount / limit);

    return successResponse(res, 200, {
      articles,
      currentPage: page,
      totalPages,
      totalArticles: totalArticlesCount,
    });
  } catch (err) {
    next(err);
  }
};

// Fetch article by ID
exports.fetchArticleById = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      return errorResponse(res, 404, "Article not found");
    }
    return successResponse(res, 200, { article });
  } catch (err) {
    next(err);
  }
};

// Create a new article (requires admin authentication)
exports.createArticle = async (req, res, next) => {
  try {
    const { user } = req;
    const { categories, title, body, shortName } = req.body;

    await articleValidator.validate(
      { categories, title, body, shortName },
      { abortEarly: false }
    );

    const newArticle = await Article.create({
      categories,
      title,
      body,
      shortName,
      published: true,
      author: user._id,
    });
    return successResponse(res, 201, { article: newArticle });
  } catch (err) {
    next(err);
  }
};

// Update an article (requires admin authentication)
exports.updateArticle = async (req, res, next) => {
  //! CHECK
  try {
    const { user } = req; // Assuming you have user information from middleware
    const { articleId } = req.params;
    const { categories, title, body, shortName } = req.body;

    await articleValidator.validate(
      { categories, title, body, shortName },
      { abortEarly: false }
    );

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { categories, title, body, shortName, author: user._id },
      {
        new: true,
      }
    );
    if (!updatedArticle) {
      return errorResponse(res, 404, "Article not found");
    }
    return successResponse(res, 200, { article: updatedArticle });
  } catch (err) {
    next(err);
  }
};

// Delete an article (requires admin authentication)
exports.removeArticle = async (req, res, next) => {
  try {
    const { user } = req;
    const { articleId } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return errorResponse(res, 404, "Article not found");
    }

    return successResponse(res, 200, {
      article: deletedArticle,
      message: "Article deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Fetch articles by category
exports.fetchArticlesByCategory = async (req, res, next) => {
  try {
    const searchParam = req.params.categoryId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!searchParam) {
      return errorResponse(
        res,
        400,
        "Please provide a category ID or short name"
      );
    }

    let categoryQuery;
    if (searchParam.match(/^[0-9a-f]{24}$/)) {
      categoryQuery = { _id: searchParam };
    } else {
      categoryQuery = { shortName: searchParam };
    }

    const category = await ArticleCategory.findOne(categoryQuery);
    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    const articles = await Article.find({
      categories: { $in: [category._id] },
      published: true,
    });

    const totalArticlesCount = await Article.countDocuments({
      categories: { $in: [category._id] },
      published: true,
    });
    const totalPages = Math.ceil(totalArticlesCount / limit);

    return successResponse(res, 200, {
      category,
      articles,
      currentPage: page,
      totalPages,
      totalArticles: totalArticlesCount,
    });
  } catch (err) {
    next(err);
  }
};

exports.articlesHome = async (req, res, next) => {
  try {
    const categories = await ArticleCategory.find().lean();
    const categoryWithArticles = [];
    for (const category of categories) {
      const articles = await Article.find({
        categories: { $in: [category._id] },
        published: true,
      });

      category.articles = articles;
      categoryWithArticles.push(category);
    }
    return successResponse(res, 200, { categories: categoryWithArticles });
  } catch (err) {
    next(err);
  }
};

exports.fetchAllCategories = async (req, res, next) => {
  try {
    const categories = await ArticleCategory.find();
    return successResponse(res, 200, { categories });
  } catch (err) {
    next(err);
  }
};

const supportedFormats = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/octet-stream",
];
exports.createArticleCategory = async (req, res, next) => {
  try {
    const { name, shortName, description } = req.body;
    await articleCategoryValidator.validate(
      { name, shortName, description },
      { abortEarly: false }
    );

    if (!req.file) {
      return errorResponse(res, 400, `Category Icon is required - field:"pic"`);
    }
    const { filename, mimetype } = req.file;

    if (!supportedFormats.includes(mimetype)) {
      return errorResponse(res, 400, "Unsupported image format");
    }

    const pic = {
      filename: filename,
      path: `images/article-category/${filename}`,
    };

    const newCategory = await ArticleCategory.create({
      name,
      shortName,
      pic,
      description,
    });
    return successResponse(res, 201, { category: newCategory });
  } catch (err) {
    next(err);
  }
};

exports.editArticleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, shortName, description } = req.body;

    await articleCategoryUpdateValidator.validate(
      { name, shortName, description },
      { abortEarly: false }
    );

    let pic = undefined;
    if (req.file) {
      const { filename, mimetype } = req.file;

      if (!supportedFormats.includes(mimetype)) {
        return errorResponse(res, 400, "Unsupported image format");
      }

      const oldData = await ArticleCategory.findOne({ _id: categoryId });
      if (oldData.pic.filename) {
        const imgPath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          "article-category",
          oldData.pic.filename
        );
        try {
          fs.unlinkSync(imgPath);
        } catch (err) {
          console.log(err);
        }
      }
      pic = {
        filename: filename,
        path: `images/article-category/${filename}`,
      };
    }

    const updatedCategory = await ArticleCategory.findByIdAndUpdate(
      categoryId,
      { name, shortName, description, pic },
      { new: true }
    );
    if (!updatedCategory) {
      return errorResponse(res, 404, "Category not found");
    }
    return successResponse(res, 200, { category: updatedCategory });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await ArticleCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return errorResponse(res, 404, "Category not found");
    }

    return successResponse(res, 200, {
      category: deletedCategory,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
