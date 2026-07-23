const mongoose = require("mongoose");

const StockSchema = require("../schemas/StockSchema");

const StockModel = mongoose.model("Stock", StockSchema);

module.exports = {
  StockModel,
};