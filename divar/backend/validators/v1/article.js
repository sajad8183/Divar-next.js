const yup = require("yup");

const articleValidator = yup.object().shape({
  categories: yup.array().of(
    yup
      .string()
      .required("Category ID is required")
      .matches(/^[0-9a-f]{24}$/, "Invalid category ID format")
  ),
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .min(3, "Title must be at least 3 characters"),
  body: yup
    .string()
    .required("Body is required")
    .trim()
    .min(10, "Body must be at least 10 characters"),
  shortName: yup
    .string()
    .required("Short name is required")
    .trim()
    .min(3, "Short name must be at least 3 characters")
    .max(50, "Short name cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Short name can only contain letters, numbers, underscores, and hyphens"
    ),
});

const articleCategoryValidator = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortName: yup
    .string()
    .required("Short name is required")
    .trim()
    .min(3, "Short name must be at least 3 characters")
    .max(50, "Short name cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Short name can only contain letters, numbers, underscores, and hyphens"
    ),
  description: yup.string(),
});

const articleCategoryUpdateValidator = yup.object().shape({
  name: yup.string(),
  shortName: yup
    .string()
    .trim()
    .min(3, "Short name must be at least 3 characters")
    .max(50, "Short name cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Short name can only contain letters, numbers, underscores, and hyphens"
    ),
  description: yup.string(),
});

module.exports = {
  articleValidator,
  articleCategoryValidator,
  articleCategoryUpdateValidator,
};
