const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { wsEngine: "ws" });

app.use("/", express.static(path.join(__dirname, "client/build")));
// const isDevelopment = process.env.npm_lifecycle_event === "devstart";
// const PORT = isDevelopment ? 3001 : 80;
const PORT = process.env.PORT || 3001;
let usersArray = [];

io.on("connection", (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);
  const sessionID = socket.id;

  socket.on("chat message", (message) => {
    const msg = { ...message, time: moment().format("HH:mm") };
    io.emit("chat message", msg);
  });

  socket.on("user name", (name) => {
    usersArray = [...usersArray, { sessionID, name }];
    io.emit("user name", JSON.stringify(usersArray));
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected with ID: ${sessionID}`);
    const disconnected = usersArray.find((obj) => obj.sessionID === sessionID);
    if (disconnected) {
      usersArray = usersArray.filter((obj) => obj.sessionID !== sessionID);
      io.emit("disconnect", disconnected.name);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
