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
    const equipments = rows.map((row) => {
      const ratingData = db.prepare("SELECT AVG(rating) as avgRating, COUNT(*) as totalRatings FROM ratings WHERE equipmentId = ?").get(row.id);
      return {
        ...row,
        _id: row.id,
        images: JSON.parse(row.images || "[]"),
        isActive: Boolean(row.isActive),
        avgRating: ratingData.avgRating ? Math.round(ratingData.avgRating * 10) / 10 : 0,
        totalRatings: ratingData.totalRatings || 0
      };
    });

    equipments.sort((a, b) => b.avgRating - a.avgRating);

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

    const ratingData = db.prepare("SELECT AVG(rating) as avgRating, COUNT(*) as totalRatings FROM ratings WHERE equipmentId = ?").get(row.id);
    const equipment = {
      ...row, _id: row.id, images: JSON.parse(row.images || "[]"), isActive: Boolean(row.isActive),
      avgRating: ratingData.avgRating ? Math.round(ratingData.avgRating * 10) / 10 : 0,
      totalRatings: ratingData.totalRatings || 0
    };
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

const deleteEquipment = async (req, res, next) => {
  try {
    const db = getDb();
    const row = db.prepare("SELECT * FROM equipment WHERE id = ?").get(req.params.id);

    if (!row) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    const { ownerId } = req.body;
    if (!ownerId || row.ownerId !== ownerId) {
      const error = new Error("You can only delete your own equipment");
      error.statusCode = 403;
      throw error;
    }

    db.prepare("DELETE FROM equipment WHERE id = ?").run(req.params.id);
    res.status(200).json({ success: true, message: "Equipment deleted" });
  } catch (error) {
    next(error);
  }
};

const rateEquipment = async (req, res, next) => {
  try {
    const db = getDb();
    const { userId, rating } = req.body;
    const equipmentId = req.params.id;

    if (!userId) {
      const error = new Error("You must be logged in to rate");
      error.statusCode = 401;
      throw error;
    }

    if (!rating || rating < 1 || rating > 5) {
      const error = new Error("Rating must be between 1 and 5");
      error.statusCode = 400;
      throw error;
    }

    const equipment = db.prepare("SELECT * FROM equipment WHERE id = ?").get(equipmentId);
    if (!equipment) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    if (equipment.ownerId === userId) {
      const error = new Error("You cannot rate your own equipment");
      error.statusCode = 403;
      throw error;
    }

    const existing = db.prepare("SELECT * FROM ratings WHERE equipmentId = ? AND userId = ?").get(equipmentId, userId);
    if (existing) {
      db.prepare("UPDATE ratings SET rating = ? WHERE equipmentId = ? AND userId = ?").run(rating, equipmentId, userId);
    } else {
      db.prepare("INSERT INTO ratings (equipmentId, userId, rating) VALUES (?, ?, ?)").run(equipmentId, userId, rating);
    }

    const avg = db.prepare("SELECT AVG(rating) as avgRating, COUNT(*) as totalRatings FROM ratings WHERE equipmentId = ?").get(equipmentId);

    res.status(200).json({
      success: true,
      data: {
        avgRating: Math.round(avg.avgRating * 10) / 10,
        totalRatings: avg.totalRatings,
        userRating: rating
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEquipments, getEquipmentById, createEquipment, updateEquipment, deleteEquipment, rateEquipment };
