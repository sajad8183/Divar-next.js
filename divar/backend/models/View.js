const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    ipAddress: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("View", ViewSchema);
