const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productFields: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          slug: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
          },
          type: {
            type: String,
            enum: ["text", "number", "link", "checkbox", "radio", "selectbox"],
            required: true,
          },
          required: { type: Boolean, default: false },
          options: {
            type: [String],
            default: undefined,
            validate: {
              validator: (options) => Array.isArray(options),
            },
          },
          min: { type: Number },
          max: { type: Number },
        },
      ],
    },
    filters: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          slug: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
          },
          type: {
            type: String,
            enum: ["radio", "range", "checkbox", "selectbox"],
            required: true,
          },
          options: {
            type: [String],
            default: undefined,
            validate: {
              validator: (options) => Array.isArray(options),
            },
          },
          min: { type: Number },
          max: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
