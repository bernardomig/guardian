const joi = require("joi");
const uuid = require("uuid");
const _ = require("lodash");

var devices = require("./devices.model.js");

const devicesController = {
  async getAll(req, res) {
    const query = await devices.find({ owner: req.user.id });

    res.status(200).json(query.map(dev => dev.uid));
  },

  async info(req, res) {
    const query = await devices.findOne({ uid: req.params.uid });

    if (!query) {
      res.status(400).json({ msg: "device not found" });
      return;
    }

    const { uid } = query;

    res.status(200).json(query.toJSON());
  },

  async create(req, res) {
    const uid = await uuid.v4();

    const device = {
      uid,
      owner: req.user.id
    };

    const query = devices.create(device);

    res.status(200).json({ uid: device.uid });
  },

  async delete(req, res) {
    const device = await devices.findOneAndRemove({ uid: req.params.uid });

    if (!device) {
      res.status(400).json({ msg: "device not found" });
      return;
    }

    res.status(200).json({ msg: `deleted device ${device.uid}` });
  }
};

module.exports = devicesController;
