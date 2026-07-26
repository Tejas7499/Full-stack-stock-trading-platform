const { StockModel } = require("../models/StockModel");

const createStock = async (req, res) => {
  try {
    const {
      symbol,
      companyName,
      currentPrice,
      previousClose,
      exchange,
    } = req.body;

    if (
      !symbol ||
      !companyName ||
      currentPrice === undefined ||
      previousClose === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const normalizedSymbol = symbol.trim().toUpperCase();

    const existingStock = await StockModel.findOne({ 
      symbol: normalizedSymbol, 
    });

    if (existingStock) {
      return res.status(409).json({
        success: false,
        message: "Stock already exists",
      });
    }


    const priceChange = currentPrice - previousClose;

    const priceChangePercent =
      previousClose > 0
        ? (priceChange / previousClose) * 100
        : 0;

    const stock = await StockModel.create({
      symbol: normalizedSymbol,
      companyName,
      exchange,
      currentPrice,
      previousClose,

      openPrice: currentPrice,
      dayHigh: currentPrice,
      dayLow: currentPrice,

      change: Number(priceChange.toFixed(2)),
      changePercent: Number(priceChangePercent.toFixed(2)),

      volume: 0,
      lastPriceUpdate: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Stock created successfully",
      data: stock,
    });

  } catch (error) {
    console.error("CREATE STOCK ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create stock",
      error: error.message,
    });
  }
};

const getAllStocks = async (req, res) => {
  try {

    const stocks = await StockModel.find({
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      data: stocks,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stocks",
      error: error.message,
    });

  }
};

const getStockBySymbol = async (req, res) => {
  try {

    const stock = await StockModel.findOne({
      symbol: req.params.symbol.toUpperCase(),
      isActive: true,
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stock,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock",
      error: error.message,
    });

  }
};

const updateStock = async (req, res) => {
  try {

    const stock = await StockModel.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    stock.currentPrice =
      req.body.currentPrice ?? stock.currentPrice;

    stock.previousClose =
      req.body.previousClose ?? stock.previousClose;

    stock.companyName =
      req.body.companyName ?? stock.companyName;

    stock.exchange =
      req.body.exchange ?? stock.exchange;

    await stock.save();

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: stock,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
      error: error.message,
    });

  }
};

const deleteStock = async (req, res) => {
  try {

    const stock = await StockModel.findOne({
      symbol: req.params.symbol.toUpperCase(),
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    stock.isActive = false;

    await stock.save();

    return res.status(200).json({
      success: true,
      message: "Stock deactivated successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to deactivate stock",
      error: error.message,
    });

  }
};


module.exports = {
  createStock,
  getAllStocks,
  getStockBySymbol,
  updateStock,
  deleteStock,
};