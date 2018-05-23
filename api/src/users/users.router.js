const express = require("express");

var usersController = require("./users.controller.js");

module.exports = express.Router().get("/", usersController.get);
