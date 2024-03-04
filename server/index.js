const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3008;

// importing user routes to redirect all routes to '/users'
const userRoute = require("./route/user.route");

// MongoDB Databse server URL
const dbConfig = require("../server/database/db");

// Creating Express App
const app = express();

// Creating Socket.io app
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const { intializeSockets } = require("./socket/socketServer");

// Middleware for json parsing
app.use(bodyParser.json());

// Middleware for cross origin site access
app.use(cors());

// on starting connection of socket io
intializeSockets(io);

// using Middleware to redirect all the routes to '/users'
app.use("/users", userRoute);

// Mongoose test DB
mongoose.connection.setMaxListeners(20);
mongoose
  .connect(dbConfig.db)
  .then((res) => {
    console.log("MongoDB server started...");
  })
  .catch((err) => {
    console.log("Somethig went wrong while connecting to MongoDB server");
  });

// default err page route
app.use((req, res, next) => {
  res.json({ message: "404 this page couldn't be found" });
});

// start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { io };
