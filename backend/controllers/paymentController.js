const crypto = require("crypto");
const Razorpay = require("razorpay");
const { getDb } = require("../db/database");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (req, res, next) => {
  try {
    const db = getDb();
    const { amount, currency, bookings, receipt } = req.body;

    if (!amount || !Array.isArray(bookings) || bookings.length === 0) {
      const err = new Error("Amount and bookings array are required");
      err.statusCode = 400;
      throw err;
    }

    // Server-side price verification
    let serverTotal = 0;
    for (const booking of bookings) {
      const eq = db.prepare("SELECT dailyRate FROM equipment WHERE id = ?").get(booking.equipmentId);
      if (!eq) {
        const err = new Error(`Equipment ${booking.equipmentId} not found`);
        err.statusCode = 400;
        throw err;
      }
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
      serverTotal += eq.dailyRate * days;
    }

    if (Math.abs(serverTotal - amount) > 1) {
      const err = new Error("Price mismatch - please refresh and try again");
      err.statusCode = 400;
      throw err;
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: currency || "INR",
      receipt: receipt || `agrirent_${Date.now()}`
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const db = getDb();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookings } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      const err = new Error("Missing payment verification fields");
      err.statusCode = 400;
      throw err;
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      const err = new Error("Payment verification failed - invalid signature");
      err.statusCode = 400;
      throw err;
    }

    // Create bookings with paid status
    if (!Array.isArray(bookings) || bookings.length === 0) {
      const err = new Error("Bookings array is required");
      err.statusCode = 400;
      throw err;
    }

    const insertStmt = db.prepare(
      `INSERT INTO bookings (equipmentId, renterName, renterPhone, startDate, endDate, quantity, totalPrice, paymentStatus, razorpayOrderId, razorpayPaymentId)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?)`
    );

    const insertMany = db.transaction((items) => {
      const results = [];
      for (const item of items) {
        const result = insertStmt.run(
          item.equipmentId, item.renterName, item.renterPhone,
          item.startDate, item.endDate, item.quantity || 1, item.totalPrice || 0,
          razorpay_order_id, razorpay_payment_id
        );
        const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
        results.push({ ...booking, _id: booking.id });
      }
      return results;
    });

    const created = insertMany(bookings);
    res.status(201).json({ success: true, paymentVerified: true, count: created.length, data: created });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, verifyPayment };
