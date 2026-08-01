import { io } from "socket.io-client";

const STOCK_SERVICE_URL =
  process.env.REACT_APP_STOCK_SERVICE_URL || "http://localhost:3004";

const socket = io(STOCK_SERVICE_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export default socket;