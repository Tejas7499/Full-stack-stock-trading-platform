const { model } = require("mongoose");

const OrderSchema = require("../schemas/OrderSchema");

const OrderModel = model("Order", OrderSchema);

module.exports = {
  OrderModel,
};