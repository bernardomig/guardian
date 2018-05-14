const joi = require("joi");
const uuid = require("uuid");
const _ = require("lodash");

var cars = require("./cars.model.js");

const carsController = {
  async getAll(req, res) {
    const query = await cars.find({ owner: req.user.id });

    res.status(200).json(query.map(dev => dev.uid));
  },

  async info(req, res) {
    const query = await cars.findOne({ uid: req.params.uid });

    if (!query) {
      res.status(400).json({ msg: "car not found" });
      return;
    }

    const { uid } = query;

    res.status(200).json(query.toJSON());
  },

  async create(req, res) {
    const schema = joi.object({
      brand: joi.string().required(),
      model: joi.string().required(),
      color: joi.string().required(),
      year: joi.string().required(),
      licence: joi.string().required()
    });

    if (schema.validate(req.body).error != null) {
      res.status(400).json({ msg: "insuficient or wrong data provided" });
      return;
    }

    const uid = await uuid.v4();

    const car = _.merge(req.body, {
      uid,
      owner: req.user.id
    });

    const query = cars.create(car);

    res.status(200).json({ uid: car.uid });
  },

  async delete(req, res) {
    const car = await cars.findOneAndRemove({ uid: req.params.uid });

    if (!car) {
      res.status(400).json({ msg: "car not found" });
      return;
    }

    res.status(200).json({ msg: `deleted car ${car.uid}` });
  }
};

module.exports = carsController;
