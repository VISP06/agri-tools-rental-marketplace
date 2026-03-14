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
      renterId TEXT DEFAULT '',
      renterName TEXT NOT NULL,
      renterPhone TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      totalPrice REAL DEFAULT 0,
      status TEXT DEFAULT 'requested',
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

  // Migration: add quantity column if missing (for existing databases)
  try {
    db.exec("ALTER TABLE bookings ADD COLUMN quantity INTEGER DEFAULT 1");
  } catch (e) {
    // Column already exists, ignore
  }

  // Migration: add renterId column if missing
  try {
    db.exec("ALTER TABLE bookings ADD COLUMN renterId TEXT DEFAULT ''");
  } catch (e) {
    // Column already exists, ignore
  }

  // Migration: add latitude/longitude columns if they don't exist
  const columns = db.prepare("PRAGMA table_info(equipment)").all();
  const colNames = columns.map((c) => c.name);
  if (!colNames.includes("latitude")) {
    db.exec("ALTER TABLE equipment ADD COLUMN latitude REAL DEFAULT NULL");
  }
  if (!colNames.includes("longitude")) {
    db.exec("ALTER TABLE equipment ADD COLUMN longitude REAL DEFAULT NULL");
  }

  // Backfill: geocode existing equipment that lacks coordinates
  backfillCoordinates();

  return db;
};

const backfillCoordinates = async () => {
  const rows = db.prepare("SELECT id, location FROM equipment WHERE latitude IS NULL AND longitude IS NULL AND location != ''").all();
  if (rows.length === 0) return;

  console.log(`Backfilling coordinates for ${rows.length} equipment rows...`);
  for (const row of rows) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(row.location)}&format=json&limit=1`;
      const response = await fetch(url, {
        headers: { "User-Agent": "AgriRentMarketplace/1.0" }
      });
      const data = await response.json();
      if (data.length > 0) {
        db.prepare("UPDATE equipment SET latitude = ?, longitude = ? WHERE id = ?")
          .run(parseFloat(data[0].lat), parseFloat(data[0].lon), row.id);
        console.log(`  Geocoded "${row.location}" -> (${data[0].lat}, ${data[0].lon})`);
      }
      // Respect Nominatim rate limit: 1 request per second
      await new Promise((resolve) => setTimeout(resolve, 1100));
    } catch (err) {
      console.warn(`  Failed to geocode "${row.location}":`, err.message);
    }
  }
  console.log("Backfill complete.");
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return db;
};

module.exports = { initDatabase, getDb };
