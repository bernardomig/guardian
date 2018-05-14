const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../users/users.model.js");

const secret = require("./auth.config.js").secret;

const authController = {
  async register(req, res) {
    const schema = joi.object({
      username: joi
        .string()
        .alphanum()
        .min(6)
        .required(),
      password: joi
        .string()
        .min(8)
        .required(),
      email: joi
        .string()
        .email()
        .required()
    });

    if (schema.validate(req.body).error != null) {
      res.status(400).json({ err: "error validating body params" });
      return;
    }

    let user = req.body;

    const alreadyExists = await users.findOne({ username: user.username });

    if (alreadyExists) {
      res.status(400).json({ err: "user already exists" });
      return;
    }

    user.password = await bcrypt.hash(user.password, 10);

    const query = await users.create(user);

    res.status(200).json({ username: query.username });
  },

  async login(req, res) {
    const user = await users.findOne({ username: req.auth.user });

    const token = await jwt.sign(
      { id: user._id, username: user.username },
      secret
    );

    res.status(200).json({ token });
  }
};

module.exports = authController;
