const express = require("express");

var passengersController = require("./passengers.controller.js");

module.exports = express
  .Router()
  .get("/", passengersController.getAll)
  .post("/create", passengersController.create)
  .delete("/:uid", passengersController.delete);
