const mongoose = require("mongoose");

const EventsSchema = mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: "Devices" },
  severity: String,
  time: Date,
  solved: Boolean
});

module.exports = mongoose.model("Events", EventsSchema);
