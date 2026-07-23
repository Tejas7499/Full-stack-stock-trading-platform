const axios = require("axios");
const { OrderModel } = require("../models/OrderModel");

const buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Symbol and quantity are required",
      });
    }

    if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than zero",
    });
  }

    const stockResponse = await axios.get(
      `${process.env.STOCK_SERVICE_URL}/api/stocks/${symbol.toUpperCase()}`
    );

    const stock = stockResponse.data.data;

    const companyName = stock.companyName;
    const price = stock.currentPrice;

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock price returned by Stock Service",
      });
    }

    const order = await OrderModel.create({
      userId,
      symbol,
      companyName,
      orderType: "BUY",
      quantity,
      price,
      totalAmount: quantity * price,
      status: "COMPLETED",
    });

    await axios.post(
      `${process.env.PORTFOLIO_SERVICE_URL}/api/portfolio/internal/buy`,
      {
        symbol,
        quantity,
        price,
      },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Buy order placed and portfolio updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(
      "BUY ORDER ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to place buy order",
      error: error.response?.data?.message || error.message,
    });
  }
};

const sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const userId = req.user.id;

    if (!symbol || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Symbol and quantity are required",
      });
    }

    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0 ||
      !Number.isInteger(numericQuantity)
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number",
      });
    }

    const stockResponse = await axios.get(
      `${process.env.STOCK_SERVICE_URL}/api/stocks/${symbol.toUpperCase()}`
    );

    const stock = stockResponse.data.data;

    const normalizedSymbol = stock.symbol;
    const companyName = stock.companyName;
    const price = stock.currentPrice;

    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid stock price returned by Stock Service",
      });
    }

    await axios.post(
      `${process.env.PORTFOLIO_SERVICE_URL}/api/portfolio/internal/sell`,
      {
        symbol: normalizedSymbol,
        quantity: numericQuantity,
        price,
      },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    const order = await OrderModel.create({
      userId,
      symbol: normalizedSymbol,
      companyName,
      orderType: "SELL",
      quantity: numericQuantity,
      price,
      totalAmount: numericQuantity * price,
      status: "COMPLETED",
    });

    return res.status(201).json({
      success: true,
      message: "Sell order placed and portfolio updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(
      "SELL ORDER ERROR:",
      error.response?.data || error.message
    );

    const statusCode = error.response?.status || 500;

    return res.status(statusCode).json({
      success: false,
      message: "Failed to place sell order",
      error: error.response?.data?.message || error.message,
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("ORDER HISTORY ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
      error: error.message,
    });
  }
};

module.exports = {
  buyStock,
  sellStock,
  getOrderHistory,
};