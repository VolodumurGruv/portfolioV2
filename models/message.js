const { Schema, model } = require("mongoose");

const msgSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Type your name"],
  },
  message: {
    type: String,
    required: [true, "Leave a message"],
  },
  email: {
    type: String,
    required: [true, "Didn't get a email"],
  },
  date: Date,
});

module.exports = model("Msg", msgSchema);
