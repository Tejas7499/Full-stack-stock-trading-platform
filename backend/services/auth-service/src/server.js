require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/auth", require("./routes/AuthRoute"));

app.get("/health", (req, res) => {
    res.json({
        service: "Auth Service",
        status: "UP"
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Auth Service running on ${process.env.PORT}`);
});