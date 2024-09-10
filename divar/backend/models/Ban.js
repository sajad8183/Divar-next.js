const mongoose = require("mongoose");

const banSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports  = mongoose.model("Ban", banSchema);

