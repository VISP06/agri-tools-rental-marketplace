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
    const { equipmentId, renterName, renterPhone, startDate, endDate } = req.body;

    const result = db.prepare(
      "INSERT INTO bookings (equipmentId, renterName, renterPhone, startDate, endDate) VALUES (?, ?, ?, ?, ?)"
    ).run(equipmentId, renterName, renterPhone, startDate, endDate);

    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: { ...booking, _id: booking.id } });
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

module.exports = { getBookings, createBooking, updateBookingStatus };
