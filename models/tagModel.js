// Basic Lib Imports
const mongoose = require("mongoose");

// Tag schema
const tagSchema = mongoose.Schema(
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
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("Tag", tagSchema);
