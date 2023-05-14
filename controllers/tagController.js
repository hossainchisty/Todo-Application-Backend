// Basic Lib Imports
const asyncHandler = require("express-async-handler");
const Tag = require("../models/tagModel");

/**
 * @desc  Get all tags
 * @route   /api/v1/tags/
 * @method  GET
 * @access  Private
 * @return List of tags
 */

const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(tags);
});

/**
 * @desc    Create a new tag
 * @route   /api/v1/tag
 * @method  POST
 * @access  Private
 * @returns {object} Newly added tag in json format
 */

const addTag = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add task tag.");
  }

  const task_tags = await Tag.create({
    user: req.user.id,
    name,
  });
  res.status(201).json(task_tags);
});

/**
 * @desc    Update tags
 * @route   /api/v1/tag/:id
 * @method  PUT
 * @access  Private
 * @return Updated tag object
 */
const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const tag = await Tag.findById(id).lean();
  if (!tag) {
    res.status(400);
    throw new Error("Tag not found");
  }

  // Make sure the logged in user matches the task tag user
  if (tag.user.toString() !== userId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Tag.updateOne({ _id: id, user: userId }, req.body);
  const updatedTag = await Tag.findById(id);
  res.status(200).json(updatedTag);
});

/**
 * @desc    Delete tag
 * @route   /api/v1/tag/:id
 * @method  DELETE
 * @access  Private
 * @return  Deleted tag
 */
const deleteTag = asyncHandler(async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the task user
    if (tag.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const deletedTag = await Tag.findByIdAndRemove(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!deletedTag) {
      res.status(400);
      throw new Error("Tag not found");
    }
    res.status(200).json({
      data: deletedTag,
      id: req.params.id,
      message: "Tag was deleted.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getTags,
  addTag,
  updateTag,
  deleteTag,
};
