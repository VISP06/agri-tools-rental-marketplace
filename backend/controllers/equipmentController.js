const { getDb } = require("../db/database");

const getEquipments = async (req, res, next) => {
  try {
    const db = getDb();
    const { search, location, category } = req.query;

    let sql = "SELECT * FROM equipment WHERE isActive = 1";
    const params = [];

    if (search) {
      sql += " AND (name LIKE ? COLLATE NOCASE OR description LIKE ? COLLATE NOCASE)";
      params.push(`%${search}%`, `%${search}%`);
    }

    if (location) {
      sql += " AND location LIKE ? COLLATE NOCASE";
      params.push(`%${location}%`);
    }

    if (category) {
      sql += " AND category LIKE ? COLLATE NOCASE";
      params.push(`%${category}%`);
    }

    sql += " ORDER BY createdAt DESC";

    const rows = db.prepare(sql).all(...params);
    const equipments = rows.map((row) => ({
      ...row,
      _id: row.id,
      images: JSON.parse(row.images || "[]"),
      isActive: Boolean(row.isActive)
    }));

    res.status(200).json({ success: true, count: equipments.length, data: equipments });
  } catch (error) {
    next(error);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const db = getDb();
    const row = db.prepare("SELECT * FROM equipment WHERE id = ?").get(req.params.id);

    if (!row) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    const equipment = { ...row, _id: row.id, images: JSON.parse(row.images || "[]"), isActive: Boolean(row.isActive) };
    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const db = getDb();
    const { ownerName, ownerId, name, category, description, location, dailyRate, images } = req.body;

    const result = db.prepare(
      "INSERT INTO equipment (ownerName, ownerId, name, category, description, location, dailyRate, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(ownerName, ownerId || "", name, category, description || "", location, Number(dailyRate), JSON.stringify(images || []));

    const row = db.prepare("SELECT * FROM equipment WHERE id = ?").get(result.lastInsertRowid);
    const equipment = { ...row, _id: row.id, images: JSON.parse(row.images || "[]"), isActive: Boolean(row.isActive) };

    res.status(201).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const db = getDb();
    const updates = { ...req.body };
    const fields = [];
    const values = [];

    if (updates.ownerName !== undefined) { fields.push("ownerName = ?"); values.push(updates.ownerName); }
    if (updates.name !== undefined) { fields.push("name = ?"); values.push(updates.name); }
    if (updates.category !== undefined) { fields.push("category = ?"); values.push(updates.category); }
    if (updates.description !== undefined) { fields.push("description = ?"); values.push(updates.description); }
    if (updates.location !== undefined) { fields.push("location = ?"); values.push(updates.location); }
    if (updates.dailyRate !== undefined) { fields.push("dailyRate = ?"); values.push(Number(updates.dailyRate)); }
    if (updates.images !== undefined) { fields.push("images = ?"); values.push(JSON.stringify(updates.images)); }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    fields.push("updatedAt = datetime('now')");
    values.push(req.params.id);

    db.prepare(`UPDATE equipment SET ${fields.join(", ")} WHERE id = ?`).run(...values);

    const row = db.prepare("SELECT * FROM equipment WHERE id = ?").get(req.params.id);
    if (!row) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    const equipment = { ...row, _id: row.id, images: JSON.parse(row.images || "[]"), isActive: Boolean(row.isActive) };
    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEquipments, getEquipmentById, createEquipment, updateEquipment };
