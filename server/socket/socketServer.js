// const { io } = require("..");

// on starting connection of socket io

const intializeSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("Server socket started");

    socket.on("message", (data) => {
      console.log(
        "receiver",
        data.receiver.email,
        "Sender",
        data.sender.email,
        "message",
        data.message
      );
      io.emit(`message ${data.receiver.email}`, data);
    });

    socket.on("disconnect", () => {
      console.log("User or Client disconnected");
    });
  });
};

module.exports = { intializeSockets };
