const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema({
  cen_id: {
    type: mongoose.SchemaTypes.Number,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  open_date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  close_date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: [],
  },
});

const Center = mongoose.model("Center", centerSchema);

module.exports = Center;
