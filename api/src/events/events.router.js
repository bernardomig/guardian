const express = require("express");

var eventsController = require("./events.controller.js");

module.exports = express
  .Router()
  .get("/", eventsController.getAll)
  .post("/create", eventsController.create)
  .put("/solve/:id", eventsController.solve)
  .delete("/:id", eventsController.delete);
