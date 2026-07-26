const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE"],
      default: "NSE",
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

    openPrice: {
      type: Number,
      min: 0,
    },

    dayHigh: {
      type: Number,
      min: 0,
    },

    dayLow: {
      type: Number,
      min: 0,
    },

    change: {
      type: Number,
      default: 0,
    },

    changePercent: {
      type: Number,
      default: 0,
    },

    volume: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastPriceUpdate: {
      type: Date,
      default: Date.now,
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