const dotenv = require("dotenv");
const express = require("express");
const http = require("http").Server(express);
const io = require("socket.io")(http);
const path = require("path");
const app = express();

dotenv.config({ path: "./config.env" });
const port = 3002;

let usersArray = [];

io.on("connection", socket => {
  console.log(`A user connected with ID: ${socket.id}`);
  const sessionID = socket.id;

  socket.on("chat message", message => {
    io.emit("chat message", message);
  });

  socket.on("user name", name => {
    usersArray = [...usersArray, { sessionID, name }];
    io.emit("online", usersArray.length);
    io.emit("user name", JSON.stringify(usersArray));
  });

  socket.on("disconnect", () => {
    // console.log(`A user disconnected with ID: ${sessionID}`);
    const disconnected = usersArray.find(obj => obj.sessionID === sessionID);
    if (disconnected) {
      usersArray = usersArray.filter(obj => obj.sessionID !== sessionID);
      io.emit("disconnect", disconnected.name);
      io.emit("online", usersArray.length);
    }
  });
});

http.listen(port, () => {
  console.log("listening on *:" + port);
});
