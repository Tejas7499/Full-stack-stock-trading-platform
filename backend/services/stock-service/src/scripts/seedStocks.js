require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");
const { StockModel } = require("../models/StockModel");
const stocks = require("../data/stocks");

/**
 * Converts basic seed data into a complete stock document.
 */
const prepareStock = (stock) => {
  const currentPrice = Number(stock.currentPrice);
  const previousClose = Number(stock.previousClose);

  const change = currentPrice - previousClose;

  const changePercent =
    previousClose > 0
      ? (change / previousClose) * 100
      : 0;

  return {
    symbol: stock.symbol.trim().toUpperCase(),
    companyName: stock.companyName.trim(),
    exchange: stock.exchange || "NSE",

    currentPrice,
    previousClose,

    openPrice: currentPrice,
    dayHigh: currentPrice,
    dayLow: currentPrice,

    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),

    volume: 0,
    lastPriceUpdate: new Date(),
    isActive: true,
  };
};

const seedStocks = async () => {
  try {
    await connectDB();

    const operations = stocks.map((stock) => {
      const preparedStock = prepareStock(stock);

      return {
        updateOne: {
          filter: {
            symbol: preparedStock.symbol,
          },

          update: {
            $setOnInsert: preparedStock,
          },

          upsert: true,
        },
      };
    });

    const result = await StockModel.bulkWrite(operations);

    console.log("Stock seeding completed successfully");
    console.log(`New stocks inserted: ${result.upsertedCount}`);
    console.log(`Existing stocks skipped: ${result.matchedCount}`);
  } catch (error) {
    console.error("STOCK SEEDING ERROR:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedStocks();