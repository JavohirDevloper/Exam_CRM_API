const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  income_id: {
    type: Number,
    required: true,
  },
  user_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
  },
  inc_time: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
