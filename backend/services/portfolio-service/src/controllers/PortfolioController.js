const { HoldingsModel } = require("../models/HoldingsModel");
const { PositionsModel } = require("../models/PositionsModel");

// Get all holdings
const getHoldings = async (req, res) => {
  try {
    const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
    const holdings = await HoldingsModel.find({userId});

    return res.status(200).json({
      success: true,
      data: holdings,
    });
  } catch (error) {
    console.error("Error fetching holdings:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
    });
  }
};

// Get all positions
const getPositions = async (req, res) => {
  try {
    const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

    const positions = await PositionsModel.find({userId});

    return res.status(200).json({
      success: true,
      data: positions,
    });
  } catch (error) {
    console.error("Error fetching positions:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch positions",
    });
  }
};

const createHolding = async (req, res) => {
  try {
    const {
      name,
      qty,
      avg,
      price,
      net,
      day,
    } = req.body;

    const userId = req.user.id;

    if (
      !name ||
      qty === undefined ||
      avg === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, quantity, average price and current price are required",
      });
    }

    if (qty <= 0 || avg <= 0 || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity, average price and current price must be greater than zero",
      });
    }

    const holding = await HoldingsModel.create({
      userId,
      name,
      qty,
      avg,
      price,
      net: net || "0%",
      day: day || "0%",
    });

    return res.status(201).json({
      success: true,
      message: "Holding created successfully",
      data: holding,
    });
  } catch (error) {
    console.error("CREATE HOLDING ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create holding",
      error: error.message,
    });
  }
};

const updateHolding = async (req, res) => {
  try {

    const holding = await HoldingsModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!holding) {
      return res.status(404).json({
        success: false,
        message: "Holding not found",
      });
    }

    holding.name = req.body.name ?? holding.name;
    holding.qty = req.body.qty ?? holding.qty;
    holding.avg = req.body.avg ?? holding.avg;
    holding.price = req.body.price ?? holding.price;
    holding.net = req.body.net ?? holding.net;
    holding.day = req.body.day ?? holding.day;

    await holding.save();

    return res.status(200).json({
      success: true,
      message: "Holding updated successfully",
      data: holding,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Failed to update holding",
      error: error.message,
    });

  }
};

const deleteHolding = async (req, res) => {
  try {
    const deletedHolding = await HoldingsModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedHolding) {
      return res.status(404).json({
        success: false,
        message: "Holding not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Holding deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HOLDING ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete holding",
      error: error.message,
    });
  }
};

const addPurchasedStock = async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const userId = req.user.id;

    if (
      !symbol ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Symbol, quantity and price are required",
      });
    }

    let holding = await HoldingsModel.findOne({ userId, name: symbol });

    if (holding) {
      const oldTotal = holding.qty * holding.avg;
      const newTotal = quantity * price;
      const totalQuantity = holding.qty + quantity;

      holding.avg = (oldTotal + newTotal) / totalQuantity;
      holding.qty = totalQuantity;
      holding.price = price;

      await holding.save();
    } else {
      holding = await HoldingsModel.create({
        userId,
        name: symbol,
        qty: quantity,
        avg: price,
        price,
        net: "0%",
        day: "0%",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio updated after purchase",
      data: holding,
    });
  } catch (error) {
      console.error("PORTFOLIO BUY ERROR:");
      console.error(error);

      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};

const removeSoldStock = async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const userId = req.user.id;

    if (
      !symbol ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Symbol, quantity and price are required",
      });
    }

    const holding = await HoldingsModel.findOne({ userId, name: symbol });

    if (!holding) {
      return res.status(404).json({
        success: false,
        message: "Holding not found",
      });
    }

    if (holding.qty < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity to sell",
      });
    }

    holding.qty -= quantity;
    holding.price = price;

    if (holding.qty === 0) {
      await HoldingsModel.findByIdAndDelete(holding._id);

      return res.status(200).json({
        success: true,
        message: "Holding removed after selling all shares",
      });
    }

    await holding.save();

    return res.status(200).json({
      success: true,
      message: "Portfolio updated after sale",
      data: holding,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update sold stock",
      error: error.message,
    });
  }
};



module.exports = {
  getHoldings,
  getPositions,
  createHolding,
  updateHolding,
  deleteHolding,
  addPurchasedStock,
  removeSoldStock,
};