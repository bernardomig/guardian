const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uid: String,
  brand: String,
  model: String,
  year: Number,
  color: String,
  licence: String
});

module.exports = mongoose.model("Car", CarSchema);
