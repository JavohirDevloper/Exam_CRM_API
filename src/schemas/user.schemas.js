const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.Number,
  },
  group_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  pos_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
  },
  first_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  last_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  gender: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  contact: {
    type: mongoose.SchemaTypes.String,
    required: true,
    // unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  come_date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: Date.now,
  },
  left_date: {
    type: mongoose.SchemaTypes.Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
