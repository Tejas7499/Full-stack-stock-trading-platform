const router = require("express").Router();

const {
  createStock,
  getAllStocks,
  getStockBySymbol,
  updateStock,
  deleteStock,
} = require("../controllers/StockController");

// Create a new stock
router.post("/", createStock);

// Get all active stocks
router.get("/", getAllStocks);

// Get stock by symbol
router.get("/:symbol", getStockBySymbol);

// Update stock
router.put("/:symbol", updateStock);

// Soft delete stock
router.delete("/:symbol", deleteStock);

module.exports = router;