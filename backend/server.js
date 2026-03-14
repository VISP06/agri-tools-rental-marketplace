require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { initDatabase } = require("./db/database");
const equipmentRoutes = require("./routes/equipmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/health", healthRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

// Initialize SQLite database and start server
initDatabase();
console.log("SQLite database initialized (drive.db)");

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
