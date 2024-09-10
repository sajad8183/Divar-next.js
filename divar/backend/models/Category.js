const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    trim: true,
  },
  icon: {
    type: {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
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
{ timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
