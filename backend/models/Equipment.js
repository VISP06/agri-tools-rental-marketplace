const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
);

const equipmentSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 0
    },
    dailyRate: {
      type: Number,
      required: true,
      min: 0
    },
    availability: [availabilitySchema],
    images: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Equipment", equipmentSchema);

