const Equipment = require("../models/Equipment");

const getEquipments = async (req, res, next) => {
  try {
    const { search, location, category } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const equipments = await Equipment.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: equipments.length, data: equipments });
  } catch (error) {
    next(error);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      dailyRate: Number(req.body.dailyRate)
    };

    const equipment = await Equipment.create(payload);
    res.status(201).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (updates.hourlyRate !== undefined) {
      updates.hourlyRate = Number(updates.hourlyRate);
    }

    if (updates.dailyRate !== undefined) {
      updates.dailyRate = Number(updates.dailyRate);
    }

    const equipment = await Equipment.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!equipment) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment
};

