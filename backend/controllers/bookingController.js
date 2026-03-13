const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

const getBookings = async (req, res, next) => {
  try {
    const { equipmentId, renterPhone } = req.query;
    const query = {};

    if (equipmentId) {
      query.equipment = equipmentId;
    }

    if (renterPhone) {
      query.renterPhone = renterPhone;
    }

    const bookings = await Booking.find(query)
      .populate("equipment", "name location dailyRate ownerName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { equipmentId, renterName, renterPhone, startDate, endDate } = req.body;

    if (!equipmentId || !renterName || !renterPhone || !startDate || !endDate) {
      const error = new Error("equipmentId, renterName, renterPhone, startDate and endDate are required");
      error.statusCode = 400;
      throw error;
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      const error = new Error("Equipment not found");
      error.statusCode = 404;
      throw error;
    }

    const bookingStart = new Date(startDate);
    const bookingEnd = new Date(endDate);

    if (Number.isNaN(bookingStart.getTime()) || Number.isNaN(bookingEnd.getTime())) {
      const error = new Error("Invalid date format. Use ISO date strings like YYYY-MM-DD");
      error.statusCode = 400;
      throw error;
    }

    if (bookingEnd < bookingStart) {
      const error = new Error("endDate must be the same day or after startDate");
      error.statusCode = 400;
      throw error;
    }

    const overlappingBooking = await Booking.findOne({
      equipment: equipmentId,
      status: { $in: ["requested", "confirmed"] },
      startDate: { $lte: bookingEnd },
      endDate: { $gte: bookingStart }
    });

    if (overlappingBooking) {
      const error = new Error("Equipment is already booked for the selected dates");
      error.statusCode = 409;
      throw error;
    }

    const durationInMs = bookingEnd.getTime() - bookingStart.getTime();
    const durationInDays = Math.max(1, Math.ceil(durationInMs / (1000 * 60 * 60 * 24)));
    const totalPrice = durationInDays * equipment.dailyRate;

    const booking = await Booking.create({
      equipment: equipmentId,
      renterName,
      renterPhone,
      startDate: bookingStart,
      endDate: bookingEnd,
      totalPrice
    });

    const result = await booking.populate("equipment", "name location dailyRate ownerName");

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const updates = {};

    if (status !== undefined) {
      updates.status = status;
    }

    if (paymentStatus !== undefined) {
      updates.paymentStatus = paymentStatus;
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).populate("equipment", "name location dailyRate ownerName");

    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus
};

