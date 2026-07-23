const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Stock Service MongoDB Connected");
  } catch (error) {
    console.error("Stock Service MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;