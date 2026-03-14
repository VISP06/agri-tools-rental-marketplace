const { getDb } = require("../db/database");

// Geocode a location string using OpenStreetMap Nominatim
const geocodeLocation = async (locationText) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationText)}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: { "User-Agent": "AgriRentMarketplace/1.0" }
    });
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  } catch (err) {
    console.warn("Geocoding failed for:", locationText, err.message);
  }
  return null;
};

// Haversine distance in km
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Proxy endpoint for Nominatim geocoding (avoids CORS issues from browser)
const geocodeSearch = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(200).json({ success: true, data: [] });
    }
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=in`;
    const response = await fetch(url, {
      headers: { "User-Agent": "AgriRentMarketplace/1.0" }
    });
    const data = await response.json();
    const results = data.map((item) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon
    }));
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

const getEquipments = async (req, res, next) => {
  try {
    const db = getDb();
    const { search, location, category, lat, lng } = req.query;

    let sql = "SELECT * FROM equipment WHERE isActive = 1";
    const params = [];

    if (search) {
      sql += " AND (name LIKE ? COLLATE NOCASE OR description LIKE ? COLLATE NOCASE)";
      params.push(`%${search}%`, `%${search}%`);
    }

    // Only use text-based location filter when no coordinates are provided
    if (location && !lat && !lng) {
      const locationParts = location.split(/[\s,]+/).filter(Boolean);
      if (locationParts.length > 0) {
        const locationClauses = locationParts.map(() => "location LIKE ? COLLATE NOCASE");
        sql += ` AND (${locationClauses.join(" OR ")})`;
        locationParts.forEach((part) => params.push(`%${part}%`));
      }
    }

    if (category) {
      sql += " AND category LIKE ? COLLATE NOCASE";
      params.push(`%${category}%`);
    }

    sql += " ORDER BY createdAt DESC";

    const rows = db.prepare(sql).all(...params);
    const equipments = rows.map((row) => {
      const ratingData = db.prepare("SELECT AVG(rating) as avgRating, COUNT(*) as totalRatings FROM ratings WHERE equipmentId = ?").get(row.id);
      const item = {
        ...row,
        _id: row.id,
        images: JSON.parse(row.images || "[]"),
        isActive: Boolean(row.isActive),
        avgRating: ratingData.avgRating ? Math.round(ratingData.avgRating * 10) / 10 : 0,
        totalRatings: ratingData.totalRatings || 0
      };

      // Compute distance if search coordinates provided and equipment has coordinates
      if (lat && lng && row.latitude != null && row.longitude != null) {
        item.distance = Math.round(haversineDistance(parseFloat(lat), parseFloat(lng), row.latitude, row.longitude));
      }

      return item;
    });

    // Sort by distance if coordinates provided, otherwise by rating
    if (lat && lng) {
      equipments.sort((a, b) => {
        // Equipment with distance comes first, those without go to the end
        if (a.distance == null && b.distance == null) return b.avgRating - a.avgRating;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });
    } else {
      equipments.sort((a, b) => b.avgRating - a.avgRating);
    }

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

    // Geocode the location
    let latitude = null;
    let longitude = null;
    const geo = await geocodeLocation(location);
    if (geo) {
      latitude = geo.lat;
      longitude = geo.lon;
    }

    const result = db.prepare(
      "INSERT INTO equipment (ownerName, ownerId, name, category, description, location, dailyRate, images, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(ownerName, ownerId || "", name, category, description || "", location, Number(dailyRate), JSON.stringify(images || []), latitude, longitude);

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
    if (updates.location !== undefined) {
      fields.push("location = ?");
      values.push(updates.location);
      // Re-geocode when location changes
      const geo = await geocodeLocation(updates.location);
      if (geo) {
        fields.push("latitude = ?", "longitude = ?");
        values.push(geo.lat, geo.lon);
      }
    }
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

// Reverse geocode: convert lat/lng to city name
const reverseGeocode = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "lat and lng are required" });
    }
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&format=json&zoom=10`;
    const response = await fetch(url, {
      headers: { "User-Agent": "AgriRentMarketplace/1.0" }
    });
    const data = await response.json();
    const addr = data.address || {};
    const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || "";
    const stateName = addr.state || "";
    const displayName = [city, stateName].filter(Boolean).join(", ");
    res.status(200).json({ success: true, data: { display_name: displayName, lat: data.lat, lon: data.lon } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEquipments, getEquipmentById, createEquipment, updateEquipment, deleteEquipment, rateEquipment, geocodeSearch, reverseGeocode };
