const mongoose = require("mongoose");

const articleCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    pic: {
      type: {
        filename: { type: String, required: true },
        path: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArticleCategory", articleCategorySchema);
