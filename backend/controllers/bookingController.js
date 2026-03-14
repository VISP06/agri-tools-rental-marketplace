const { getDb } = require("../db/database");

const getBookings = async (req, res, next) => {
  try {
    const db = getDb();
    const rows = db.prepare(`
      SELECT b.*, e.name as equipmentName, e.category as equipmentCategory, e.location as equipmentLocation
      FROM bookings b
      LEFT JOIN equipment e ON b.equipmentId = e.id
      ORDER BY b.createdAt DESC
    `).all();

    const bookings = rows.map((row) => ({
      ...row,
      _id: row.id,
      equipment: {
        _id: row.equipmentId,
        name: row.equipmentName,
        category: row.equipmentCategory,
        location: row.equipmentLocation
      }
    }));

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const db = getDb();
    const { equipmentId, renterName, renterPhone, startDate, endDate, quantity, totalPrice } = req.body;

    const result = db.prepare(
      "INSERT INTO bookings (equipmentId, renterName, renterPhone, startDate, endDate, quantity, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run(equipmentId, renterName, renterPhone, startDate, endDate, quantity || 1, totalPrice || 0);

    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: { ...booking, _id: booking.id } });
  } catch (error) {
    next(error);
  }
};

const createBatchBookings = async (req, res, next) => {
  try {
    const db = getDb();
    const { bookings } = req.body;

    if (!Array.isArray(bookings) || bookings.length === 0) {
      const error = new Error("Bookings array is required and must not be empty");
      error.statusCode = 400;
      throw error;
    }

    const insertStmt = db.prepare(
      "INSERT INTO bookings (equipmentId, renterName, renterPhone, startDate, endDate, quantity, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    const insertMany = db.transaction((items) => {
      const results = [];
      for (const item of items) {
        const result = insertStmt.run(
          item.equipmentId, item.renterName, item.renterPhone,
          item.startDate, item.endDate, item.quantity || 1, item.totalPrice || 0
        );
        const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
        results.push({ ...booking, _id: booking.id });
      }
      return results;
    });

    const created = insertMany(bookings);
    res.status(201).json({ success: true, count: created.length, data: created });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const db = getDb();
    db.prepare("UPDATE bookings SET status = ?, updatedAt = datetime('now') WHERE id = ?").run(req.body.status, req.params.id);

    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);
    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: { ...booking, _id: booking.id } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBookings, createBooking, createBatchBookings, updateBookingStatus };
