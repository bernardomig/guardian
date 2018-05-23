const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressBasicAuth = require("express-basic-auth");
const expressJWT = require("express-jwt");

const users = require("../users/users.model.js");

const secret = require("./auth.config.js").secret;

const verifyBasic = async (username, password, cb) => {
  const query = await users.findOne({ username });

  if (!query) {
    cb(null, false);
  }

  const samePass = await bcrypt.compare(password, query.password);

  cb(null, true);
};

const basicAuth = expressBasicAuth({
  authorizer: verifyBasic,
  authorizeAsync: true,
  unauthorizedResponse: { msg: "not authorized" }
});

const jwtAuth = expressJWT({ secret });

module.exports = { basicAuth, jwtAuth };
