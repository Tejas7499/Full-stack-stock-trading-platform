const { io } = require("socket.io-client");

const socket = io("http://localhost:3004");

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("market-update", (stocks) => {
  console.clear();
  console.log("Received Market Update");
  console.table(stocks.slice(0, 5));
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});