const joi = require("joi");
const uuid = require("uuid");

const passengers = require("./passengers.model.js");

const passengersController = {
  async getAll(req, res) {
    const query = await passengers.find({ user: req.user.id });

    res.status(200).json(query.map(q => q.uid));
  },

  async create(req, res) {
    const schema = joi.object({
      name: joi.string().required(),
      gender: joi
        .string()
        .valid("male", "female")
        .required(),
      bloodType: joi.string().optional(),
      birthday: joi.date().required(),
      knownDiseases: joi.array().optional()
    });

    if (schema.validate(req.body).error != null) {
      res.status(400).json({ msg: "insuficient or wrong data provided" });
      return;
    }

    let passenger = req.body;

    passenger.user = req.user.id;
    passenger.uid = uuid.v4();

    const query = await passengers.create(passenger);

    console.log(query);

    res.status(200).json({ uid: query.uid, name: query.name });
  },

  async delete(req, res) {
    const passenger = await passengers.findOneAndRemove({
      uid: req.params.uid
    });

    if (!passenger) {
      res.status(400).json({ msg: "passenger not found" });
      return;
    }

    res.status(200).json({ msg: `deleted passenger ${passenger.uid}` });
  }
};

module.exports = passengersController;
