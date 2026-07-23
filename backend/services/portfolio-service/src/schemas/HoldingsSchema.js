const { Schema } = require("mongoose");


const HoldingsSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },

    name: {
        type: String,
        required: true,
    },

    qty: {
        type: Number,
        required: true,
    },

    avg: {
        type: Number,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    net: String,

    day: String,
});

module.exports = { HoldingsSchema }; 