// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  getTasksByPriority,
  getTasksByStatus,
  markAsComplete,
  getFilteredTasks,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// Adding n getting tasks
router.route("/").get(protect, getTask).post(protect, addTask);

// Deleting n updating tasks
router
  .route("/:id")
  .delete(protect, deleteTask)
  .put(protect, updateTask)
  .patch(protect, markAsComplete);

// Get tasks by priority
router.route("/priority/:priority").get(protect, getTasksByPriority);

// Get tasks by status
router.route("/status/:status").get(protect, getTasksByStatus);

router.route("/filter").get(protect, getFilteredTasks);

// Exporting the Router
module.exports = router;
