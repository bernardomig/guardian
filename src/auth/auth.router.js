const express = require("express");

const authController = require("./auth.controller.js");
const authMiddleware = require("./auth.middleware.js");

var authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authMiddleware.basicAuth, authController.login);

module.exports = authRouter;
