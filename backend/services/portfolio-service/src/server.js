require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const portfolioRoutes = require("./routes/PortfolioRoute");

const app = express();


connectDB();
 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/portfolio", portfolioRoutes);



app.get("/health", (req, res) => {
  res.json({
    service: "Portfolio Service",
    status: "UP",
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Portfolio Service running on port ${process.env.PORT}`);
});