const http = require("http");
const { Server } = require("socket.io");

const RealtimeService = require("./services/RealtimeService");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const MarketSimulationService = require("./services/MarketSimulationService");

const stockRoutes = require("./routes/StockRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/stocks", stockRoutes);

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    service: "stock-service",
    message: "Stock Service is healthy",
  });
});

const PORT = process.env.PORT || 3004;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


RealtimeService.initialize(io);

io.on("connection", (socket) => {
  console.log(`Client Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client Disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Stock Service running on port ${PORT}`);

  MarketSimulationService.start();
});

