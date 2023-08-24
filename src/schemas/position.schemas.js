const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  pos_id: {
    type: Number,
    required: true,
  },
  dep_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  pos_name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  delete_at: {
    type: Date,
    default: null,
  },
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
