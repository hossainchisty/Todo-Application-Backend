// Basic Lib Import
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../helper/generateToken");
const randomString = require("randomstring");

/**
 * @desc    Register new user
 * @route   /api/v1/users/register
 * @method  POST
 * @access  Public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    full_name,
    email,
    password: hashedPassword,
    avatar: req.body.avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      full_name: user.full_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Authenticate a user
 * @route   /api/v1/users/login
 * @method  POST
 * @access  Public
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.send({
      token: generateToken(user._id),
      message: "Logged in successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @desc    Get user data
 * @route   /api/v1/users/me
 * @method  GET
 * @access  Private
 * @requires Logged User
 */

const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
