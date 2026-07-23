const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    previousClose: {
      type: Number,
      required: true,
      min: 0,
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE"],
      default: "NSE",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = StockSchema;