const express = require("express");
const {
  getBookings,
  createBooking,
  createBatchBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.post("/batch", createBatchBookings);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;

