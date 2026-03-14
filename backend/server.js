require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { initDatabase } = require("./db/database");
const equipmentRoutes = require("./routes/equipmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
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

// Serve frontend static files
const frontendPath = path.join(__dirname, "..", "frontend");
app.use("/src", express.static(path.join(frontendPath, "src")));
app.use(express.static(path.join(frontendPath, "public")));

// SPA fallback: serve index.html for all non-API routes
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontendPath, "public", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

// Initialize SQLite database and start server
initDatabase();
console.log("SQLite database initialized (drive.db)");

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
