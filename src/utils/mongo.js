const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("mongo"))
  .then(console.log("connection"))
  .catch((er) => console.log(er.message));
