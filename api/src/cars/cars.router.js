const express = require("express");

var carsController = require("./cars.controller.js");

module.exports = express
  .Router()
  .get("/", carsController.getAll)
  .get("/:uid", carsController.info)
  .post("/create", carsController.create)
  .delete("/:uid", carsController.delete);
