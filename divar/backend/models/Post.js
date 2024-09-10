const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, min: 3, index: "text" },
    map: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    exchange: { type: Boolean, required: true, default: false },
    pics: {
      type: [
        {
          filename: { type: String, required: true },
          path: { type: String, required: true },
        },
      ],
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    accepted: { type: Boolean, required: true, default: false },
    dynamicFields: { type: mongoose.Schema.Types.Mixed },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "published", "rejected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
