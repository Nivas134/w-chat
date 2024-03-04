const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  sender: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reciever: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  chattingOfUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  chatID: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
