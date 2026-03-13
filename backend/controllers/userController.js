const User = require("../models/User");

const registerUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId || !userId.trim()) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const existing = await User.findOne({ userId: userId.trim() });
    if (existing) {
      const error = new Error("This ID already exists. Please choose a different one.");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ userId: userId.trim() });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId || !userId.trim()) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ userId: userId.trim() });
    if (!user) {
      const error = new Error("ID not found. Please create an account first.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
