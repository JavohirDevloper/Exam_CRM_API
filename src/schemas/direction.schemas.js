const mongoose = require("mongoose");

const directionSchema = new mongoose.Schema({
  dep_id: {
    type: Number,
    required: true,
  },
  dep_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  dir_name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: null,
  },
});

const Direction = mongoose.model("Direction", directionSchema);

module.exports = Direction;
