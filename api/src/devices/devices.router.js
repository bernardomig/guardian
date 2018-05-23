const express = require("express");

var devicesController = require("./devices.controller.js");

module.exports = express
  .Router()
  .get("/", devicesController.getAll)
  .get("/:uid", devicesController.info)
  .post("/create", devicesController.create)
  .delete("/:uid", devicesController.delete);
