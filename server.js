const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "client/build")));
const isDevelopment = process.env.npm_lifecycle_event === "devstart";
const PORT = isDevelopment ? 3001 : 80;

io.on("connection", (socket) => {
  console.log(`New connection with ID: ${socket.id}`);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
