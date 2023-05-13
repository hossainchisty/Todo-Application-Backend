// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
  getTags,
  addTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

const { protect } = require("../middleware/authMiddleware");

// Adding and getting categories
router.route("/").get(protect, getTags).post(protect, addTag);

// Deleting and updating categories
router.route("/:id").delete(protect, deleteTag).put(protect, updateTag);

// Exporting the Router
module.exports = router;