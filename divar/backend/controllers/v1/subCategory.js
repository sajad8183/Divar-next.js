const { successResponse, errorResponse } = require("../../helpers/responses");
const SubCategory = require("../../models/SubCategory");
const ParentCategory = require("../../models/Category");
const { subCategoryValidator } = require("../../validators/v1/category");

exports.createSubCategory = async (req, res, next) => {
  try {
    const { title, slug, parent, description, productFields, filters } =
      req.body;

    await subCategoryValidator.validate(
      { title, slug, parent, description, productFields, filters },
      { abortEarly: false }
    );
    const parentCheck = await ParentCategory.findById(parent);
    if (!parentCheck) {
      return errorResponse(res, 400, "parent Id is not correct");
    }
    const category = await SubCategory.create({
      title,
      slug,
      parent,
      description,
      productFields,
      filters,
    });

    return successResponse(res, 201, {
      category,
      message: "SubCategory created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.editSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title, slug, parent, description, productFields, filters } =
      req.body;

    await subCategoryValidator.validate(
      { title, slug, parent, description, productFields, filters },
      { abortEarly: false }
    );

    const parentCheck = await ParentCategory.findById(parent);
    if (!parentCheck) {
      return errorResponse(res, 400, "parent Id is not correct");
    }

    const updatedCategory = await SubCategory.findByIdAndUpdate(
      categoryId,
      {
        title,
        slug,
        parent,
        description,
        productFields,
        filters,
      },
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return errorResponse(res, 400, "SubCategory not found");
    }

    return successResponse(res, 200, {
      category: updatedCategory,
      message: "SubCategory updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get one category by slug or id
// !implement the slug search for all with categoryId
exports.getSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await SubCategory.findById(categoryId);
    if (!category) {
      return errorResponse(res, 404, "SubCategory not found");
    }
    return successResponse(res, 200, { category });
  } catch (error) {
    next(error);
  }
};

// Get all sub categories
exports.getAllSubCategories = async (req, res, next) => {
  try {
    const categories = await SubCategory.find();

    return successResponse(res, 200, { categories });
  } catch (error) {
    next(error);
  }
};

// Delete a category
exports.deleteSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await SubCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return errorResponse(res, 404, "SubCategory not found");
    }
    return successResponse(res, 200, {
      category: deletedCategory,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
