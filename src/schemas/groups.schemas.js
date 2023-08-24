const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_id: {
    type: Number,
    // required: true,
  },
  dir_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Direction",
  },
  group_name: {
    type: String,
    required: true,
  },
  begin_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: null,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
