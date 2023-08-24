const mongoose = require("mongoose");

const outlaySchema = new mongoose.Schema({
  outlay_id: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
  },
  out_time: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

const Outlay = mongoose.model("Outlay", outlaySchema);

module.exports = Outlay;
