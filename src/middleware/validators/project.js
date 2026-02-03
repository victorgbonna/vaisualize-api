const Joi = require("joi");
const validator = require("../validator");


const initializeProjectSchema = validator(
  Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    mode: Joi.string().required(),
    description: Joi.string().allow('', null),
  })
);


module.exports = {initializeProjectSchema};
  