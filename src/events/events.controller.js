const joi = require("joi");
const uuid = require("uuid");
const _ = require("lodash");

const events = require("./events.model.js");
const devices = require("../devices/devices.model");

const eventsController = {
  async getAll(req, res) {
    const solved = req.query.solved;
    const queryParams = solved ? { solved } : {};

    const query = await events
      .find(queryParams)
      //.limit(10)
      .sort("time");

    res.status(200).json(query);
  },

  async create(req, res) {
    const schema = joi.object({
      device: joi.string().required(),
      severity: joi.string().required(),
      location: joi.string().optional()
    });

    if (schema.validate(req.body).error != null) {
      res.status(400).json({ msg: "insuficient or wrong data provided" });
      return;
    }

    const device = await devices.findOne({ uid: req.body.device });

    console.log(device);

    if (!device) {
      res.status(200).json({ msg: "device not found" });
      return;
    }

    let event = _.merge(req.body, {
      device: device._id,
      time: new Date(),
      solved: false
    });

    const query = await events.create(event);

    console.log(query);

    res.status(200).json({ msg: "event created" });
  },

  async solve(req, res) {
    const eventID = req.params.id;

    let event = await events.findById(eventID);
    
    console.log(event);

    if (!event) {
      res.status(400).json({ msg: "event not found" });
      return;
    }

    event.solved = true;
    event.save();

    console.log(event);

    res.status(200).json({ msg: "event was solved" });
  },

  async delete(req, res) {

    const eventID = await events.findByIdAndRemove(req.params.id);

    console.log(eventID);

    if (!eventID) {
      res.status(400).json({ msg: "event not found" });
      return;
    }

    res.status(200).json({ msg: `event deleted ${eventID.id}` });
  }
};

module.exports = eventsController;
