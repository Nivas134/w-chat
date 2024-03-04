const mongoose = require("mongoose");
const Chat = require("./chat");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  userChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = mongoose.model("User", userSchema);
