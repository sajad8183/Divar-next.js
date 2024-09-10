const { successResponse, errorResponse } = require("../../helpers/responses");
const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");
const {
  categoryValidator,
  categoryEditValidator,
} = require("../../validators/v1/category");

const supportedFormats = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/octet-stream"

];

exports.createCategory = async (req, res, next) => {
  try {
    const { title, slug, parent, description, filters } = req.body;
    await categoryValidator.validate(
      { title, slug, parent, description, filters },
      { abortEarly: false }
    );
    //! check uniqueness of slug

    let icon = null;
    if (req.file) {
      const { filename, mimetype } = req.file;

      if (!supportedFormats.includes(mimetype)) {
        return errorResponse(res, 400, "Unsupported image format");
      }

      icon = {
        filename: filename,
        path: `images/category-icons/${filename}`,
      };
    }

    const newCategory = await Category.create({
      title,
      slug,
      parent,
      description,
      icon,
      filters,
    });
    return successResponse(res, 201, { category: newCategory });
  } catch (err) {
    next(err);
  }
};

exports.editCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title, slug, parent, description, filters } = req.body;

    await categoryEditValidator.validate(
      { title, slug, parent, description, filters },
      { abortEarly: false }
    );
    //! check uniqueness of slug
    let icon = null;
    if (req.file) {
      const { filename, mimetype } = req.file;

      if (!supportedFormats.includes(mimetype)) {
        return errorResponse(res, 400, "Unsupported image format");
      }

      icon = {
        filename: filename,
        path: `images/category-icons/${filename}`,
      };
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title, slug, parent, description, icon, filters },
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

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

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

// Get all categories
exports.fetchAllCategories = async (req, res, next) => {
  try {
    const fetchSubcategoriesRecursively = async (parentId = null) => {
      const subCategories = await SubCategory.find({ parent: parentId });
      const parentSubCategories = await Category.find({
        parent: parentId,
      }).lean();

      const fetchedParentSubCategories = [];
      for (const category of parentSubCategories) {
        category.subCategories = await fetchSubcategoriesRecursively(
          category._id
        );
        fetchedParentSubCategories.push(category);
      }

      return [...fetchedParentSubCategories, ...subCategories];
    };

    const categories = await fetchSubcategoriesRecursively(null);

    return successResponse(res, 200, { categories });
  } catch (error) {
    next(error);
  }
};
