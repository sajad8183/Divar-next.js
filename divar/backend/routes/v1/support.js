const express = require("express");
const router = express.Router();

const { adminAuth } = require("../../middlewares/adminCheck");

const articleController = require("../../controllers/v1/article");

const { multerStorage } = require("../../utils/multerConfig");
const upload = multerStorage("public/images/article-category");

router
  .route("/articles")
  .get(articleController.fetchAllArticles)
  .post(adminAuth, articleController.createArticle);

router.route("/category-articles").get(articleController.articlesHome);

router.route("/articles/search").get(articleController.searchArticles);

router
  .route("/articles/:articleId")
  .get(articleController.fetchArticleById)
  .put(adminAuth, articleController.updateArticle);
router
  .route("/articles/:articleId/xbox")
  .delete(adminAuth, articleController.removeArticle);

router
  .route("/categories")
  .get(articleController.fetchAllCategories)
  .post(
    adminAuth,
    upload.single("pic"),
    articleController.createArticleCategory
  );

router
  .route("/categories/:categoryId")
  .put(adminAuth, upload.single("pic"), articleController.editArticleCategory);
router
  .route("/categories/:categoryId/xbox")
  .delete(adminAuth, articleController.deleteArticleCategory);

router
  .route("/categories/:categoryId/articles")
  .get(articleController.fetchArticlesByCategory);

module.exports = router;
