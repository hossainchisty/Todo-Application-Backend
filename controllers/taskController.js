// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

/**
 * @desc  Get all tasks
 * @route   /api/v1/tasks/
 * @method  GET
 * @access  Private
 * @return List of tasks
 */

const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

/**
 * @desc    Find tasks based on priority
 * @route   /api/v1/tasks/priority/:priority
 * @method  GET
 * @access  Private
 */

const getTasksByPriority = asyncHandler(async (req, res) => {
  const priority = req.params.priority;

  // Validate priority
  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    return res.status(400).send({ error: "Invalid priority" });
  }

  try {
    const tasks = await Task.find({ user: req.user.id, priority: priority });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

/**
 * @desc    Find tasks based on status
 * @route   /api/v1/tasks/status/:status
 * @method  GET
 * @access  Private
 */

const getTasksByStatus = asyncHandler(async (req, res) => {
  const status = req.params.status;

  // Validate status
  if (status !== "todo" && status !== "in-progress" && status !== "done") {
    return res.status(400).send({ error: "Invalid status" });
  }

  try {
    const tasks = await Task.find({ user: req.user.id, status: status });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

/**
 * @desc    Mark the task as completed
 * @route   /api/v1/tasks/:id
 * @method  GET
 * @access  Private
 */

const markAsComplete = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted: true },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Create a new task for the authenticated user
 * @route   /api/v1/tasks
 * @method  POST
 * @access  Private
 * @returns {object} Newly added task in json format
 */

const addTask = asyncHandler(async (req, res) => {
  const { title, description, priorityLevel, status, category, tags, dueDate } =
    req.body;

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add task title.");
  }

  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    priorityLevel,
    status,
    category,
    tags,
    dueDate,
  });
  res.status(201).json(task);
});

/**
 * @desc    Update task
 * @route   /api/v1/tasks/:id
 * @method  PUT
 * @access  Private
 * @return Updated task
 */
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const task = await Task.findById(id).lean();
  if (!task) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== userId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Task.updateOne({ _id: id, user: userId }, req.body);
  const updatedTask = await Task.findById(id);
  res.status(200).json(updatedTask);
});

/**
 * @desc    Delete task
 * @route   /api/v1/tasks/:id
 * @method  DELETE
 * @access  Private
 * @return  Deleted Task
 */
const deleteTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const deletedTask = await Task.findByIdAndRemove(req.params.id, req.body, {
      new: true,
    });

    if (!deletedTask) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.status(200).json({
      data: deletedTask,
      id: req.params.id,
      message: "Task was deleted.",
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all tasks, optionally sorted and filtered
 * @route   GET /api/v1/task
 * @access  Public
 * @param   sortBy - The field to sort by
 * @param   sortDirection - The sort direction (asc or desc)
 * @param   title - The title to filter by
 * @param   dueDate - The due date to filter by
 * @param   priority - The priority to filter by
 * @return  An array of task objects
 */

const getFilteredTasks = asyncHandler(async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }

    if (req.query.dueDate) {
      filters.dueDate = new Date(req.query.dueDate);
    }

    if (req.query.priority) {
      filters.priority = req.query.priority;
    }

    const tasks = await Task.find(filters).sort(
      req.query.sortBy && {
        [req.query.sortBy]: req.query.sortDirection === "desc" ? -1 : 1,
      }
    );

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  getTasksByPriority,
  getTasksByStatus,
  markAsComplete,
  getFilteredTasks,
};
