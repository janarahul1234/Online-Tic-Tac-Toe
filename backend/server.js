import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketConnection } from "./socketHandlers.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: true });

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  handleSocketConnection(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
