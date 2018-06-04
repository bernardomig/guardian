const mongoose = require("mongoose");

const PassengerSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uid: String,
  name: String,
  gender: String,
  bloodType: String,
  age: String,
  knownDiseases: [String]
});

module.exports = mongoose.model("Passenger", PassengerSchema);
