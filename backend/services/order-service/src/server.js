require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require ("morgan");

const connectDB = require("./config/db");
const orderRoutes = require("./routes/OrderRoute");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
    res.json({
        service: "order service",
        status: "up",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Order service running on port ${process.env.PORT}`);
});