const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");

const mongoose = require("mongoose");
mongoose.connect("mongodb://172.19.0.2/guardian");

let app = express();

app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router = express.Router();

router.get("/ping", async (req, res) => {
  res.status(200).json({ pong: "pong" });
});

app.use(router);

app.use("/auth", require("./auth/auth.module.js").router);

const jwtAuth = require("./auth/auth.module.js").middleware.jwtAuth;

app.use("/users", jwtAuth, require("./users/users.module.js").router);

app.use("/devices", jwtAuth, require("./devices/devices.module.js").router);

app.use("/cars", jwtAuth, require("./cars/cars.module.js").router);

app.use("/events", require("./events/events.module.js").router);

app.use(
  "/passengers",
  jwtAuth,
  require("./passengers/passengers.module.js").router
);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json("invalid token");
  }
});

app.use((req, res, next) => {
  res.status(404).json({ msg: "not found" });
});

app.listen("8080");
