const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    href: {
      type: String,
      required: true,
      unique: true,
    },
    repeat: {
      type: Number,
      default: 0,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "City",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("City", schema);

module.exports = model;
