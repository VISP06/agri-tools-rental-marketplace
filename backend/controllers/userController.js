const { getDb } = require("../db/database");

const registerUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { userId } = req.body;

    if (!userId || !userId.trim()) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const existing = db.prepare("SELECT * FROM users WHERE userId = ?").get(userId.trim());
    if (existing) {
      const error = new Error("This ID already exists. Please choose a different one.");
      error.statusCode = 409;
      throw error;
    }

    const result = db.prepare("INSERT INTO users (userId) VALUES (?)").run(userId.trim());
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { userId } = req.body;

    if (!userId || !userId.trim()) {
      const error = new Error("User ID is required");
      error.statusCode = 400;
      throw error;
    }

    const user = db.prepare("SELECT * FROM users WHERE userId = ?").get(userId.trim());
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
