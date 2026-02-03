const Joi = require("joi");
const validator = require("../validator");


const makeRequestSchema = validator(
  Joi.object({
    columns: Joi.array().items(Joi.string()).required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    mode: Joi.string().required(),

    description: Joi.string().allow('', null),
    goal: Joi.string().allow('', null),
    
    sample_data: Joi.array().required(),
    file_url: Joi.array().required(),
    categorical_columns: Joi.array().items(Joi.string()).required(),
    numerical_columns: Joi.array().items(Joi.string()).required(),
    date_columns: Joi.array().items(Joi.string()).required(),
    unique_columns: Joi.array().items(Joi.string()).required(),
    non_placed_columns: Joi.array().items(Joi.string()).required(),
    all_columns: Joi.array().items(Joi.string()).required(),
  })
);

module.exports = {makeRequestSchema};
  