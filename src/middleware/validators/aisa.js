const Joi = require("joi");
const validator = require("../validator");

const createAisaSchema = validator(
  Joi.object({
    email: Joi.string().email().required(),
  })
);

module.exports = { createAisaSchema };
