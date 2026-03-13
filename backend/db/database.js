const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "drive.db");

let db;

const initDatabase = () => {
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT UNIQUE NOT NULL,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ownerId TEXT DEFAULT '',
      ownerName TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT DEFAULT '',
      location TEXT NOT NULL,
      hourlyRate REAL DEFAULT 0,
      dailyRate REAL NOT NULL,
      images TEXT DEFAULT '[]',
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipmentId INTEGER NOT NULL,
      renterName TEXT NOT NULL,
      renterPhone TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      totalPrice REAL DEFAULT 0,
      status TEXT DEFAULT 'requested',
      paymentStatus TEXT DEFAULT 'pending',
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (equipmentId) REFERENCES equipment(id)
    );

    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipmentId INTEGER NOT NULL,
      userId TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (equipmentId) REFERENCES equipment(id) ON DELETE CASCADE,
      UNIQUE(equipmentId, userId)
    );
  `);

  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return db;
};

module.exports = { initDatabase, getDb };
