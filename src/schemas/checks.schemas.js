const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
  check_id: {
    type: Number,
    required: true,
  },
  gr_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  user_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  not_in_class: {
    type: Array,
    required: true,
    default: ["kelgan"],
  },
  add_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Check", checkSchema);
