var joi = require("joi");

var users = require("./users.model.js");

const usersController = {
  async get(req, res) {
    const user = await users.findById(req.user.id);

    const { username, email } = user;
    res.status(200).json({ username, email });
  }
};

module.exports = usersController;
