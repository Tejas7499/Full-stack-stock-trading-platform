const router = require("express").Router();

const {buyStock, sellStock, getOrderHistory} = require('../controllers/OrderController');
const { verifyToken } = require("../middlewares/AuthMiddleware");

router.post("/buy", verifyToken, buyStock);
router.post("/sell", verifyToken, sellStock);
router.get("/history", verifyToken, getOrderHistory);

module.exports = router;