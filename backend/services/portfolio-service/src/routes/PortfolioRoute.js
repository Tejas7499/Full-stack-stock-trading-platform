const router = require("express").Router();

const {
  getHoldings,
  getPositions,
  createHolding,
  updateHolding,
  deleteHolding,
  addPurchasedStock,
  removeSoldStock,
} = require("../controllers/PortfolioController");

const { verifyToken } = require("../middlewares/AuthMiddleware");

router.get("/holdings", verifyToken, getHoldings);
router.post("/holdings", verifyToken, createHolding);
router.put("/holdings/:id", verifyToken, updateHolding);
router.delete("/holdings/:id", verifyToken, deleteHolding);
router.post("/internal/buy", verifyToken, addPurchasedStock);
router.post("/internal/sell", verifyToken, removeSoldStock);
router.get("/positions", verifyToken, getPositions);
module.exports = router;