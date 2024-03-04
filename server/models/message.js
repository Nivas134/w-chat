const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageDescription: {
    type: String,
  },
  isSender: {
    type: Boolean,
  },
  timeStamp: {
    type: String,
  },
  isTyping: {
    type: Boolean,
  },
  isDelivered: {
    type: Boolean,
  },
  isSeen: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Message", messageSchema);
