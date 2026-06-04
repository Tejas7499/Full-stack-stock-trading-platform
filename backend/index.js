require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const {HoldingsModel} = require("./model/HoldingsModel");
const {PositionsModel} = require("./model/PositionsModel");
const {OrdersModel} =  require("./model/OrdersModel")


const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);


app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions); 
});

app.post("/newOrder", async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });

    newOrder.save();

    res.send("Order saved !");
});


mongoose.connect(url)
.then(() => {
    console.log("DB connected");

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("DB connection error:", err);
});