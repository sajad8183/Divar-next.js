const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  editSubCategory,
  getSubCategory,
  getAllSubCategories,
  deleteSubCategory,
} = require("../../controllers/v1/subCategory");
const {
  createCategory,
  editCategory,
  deleteCategory,
  fetchAllCategories,
} = require("../../controllers/v1/category");

const { multerStorage } = require("../../utils/multerConfig");
const { adminAuth } = require("../../middlewares/adminCheck");
const upload = multerStorage("public/images/category-icons");

// category
router
  .route("/")
  .get(fetchAllCategories)
  .post(adminAuth, upload.single("icon"), createCategory);
router.route("/:categoryId").put(adminAuth, editCategory);
router.route("/:categoryId/xbox").delete(adminAuth, deleteCategory);

// sub category
router
  .route("/sub")
  .post(adminAuth, createSubCategory)
  .get(getAllSubCategories);
router
  .route("/sub/:categoryId")
  .get(getSubCategory)
  .put(adminAuth, editSubCategory);
  
router.route("/sub/:categoryId/xbox").delete(adminAuth, deleteSubCategory);

module.exports = router;
