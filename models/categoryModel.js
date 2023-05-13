// Basic Lib Imports
const mongoose = require("mongoose");

// Category schema
const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
