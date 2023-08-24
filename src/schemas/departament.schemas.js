const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  deportament_id: {
    type: Number,
    // required: true,
  },
  deportament_name: {
    type: String,
    required: true,
  },
  center_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Center",
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  delete_at: {
    type: Date,
    default: null,
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
