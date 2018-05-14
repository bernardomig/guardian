const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema({
  token: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uid: String,
  token: String
});

module.exports = mongoose.model("Device", DeviceSchema);
