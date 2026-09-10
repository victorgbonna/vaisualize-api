const Joi = require("joi");

const visualizationSchema = Joi.object({
  title: Joi.string().required(),
//   lookUpTable: Joi.string().required(),
  chartType: Joi.string().required(),
  x: Joi.object({
    table: Joi.string().required(),
    col: Joi.string().required(),
  }).required(),
  y: Joi.object({
    table: Joi.string().required(),
    col: Joi.string().required(),
  }).required(),
  group_by: Joi.object({
    table: Joi.string().required(),
    col: Joi.string().required(),
  }).required(),
  aggregate: Joi.string().required(),
  unit: Joi.string().required(),
}).unknown(true);

const addVisualizationsSchema = (req, res, next) => {
  const { error } = Joi.array()
    .items(visualizationSchema)
    .min(1)
    .required()
    .validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: { message: error.details.map((detail) => detail.message) },
    });
  }

  next();
};

module.exports = { addVisualizationsSchema };