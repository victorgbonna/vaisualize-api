const Joi = require("joi");

const axisSchema = Joi.object({
  table: Joi.string().required(),
  col: Joi.string().required(),
}).unknown(true);

const visualizationSchema = Joi.object({
  title: Joi.string(),

  chartType: Joi.string().required(),

  x: Joi.alternatives()
    .try(axisSchema, Joi.array().items(axisSchema))
    .optional()
    .allow(null),

  y: Joi.alternatives()
    .try(axisSchema, Joi.array().items(axisSchema))
    .optional()
    .allow(null),

  z: Joi.alternatives()
    .try(axisSchema, Joi.array().items(axisSchema))
    .optional()
    .allow(null),

  group_by: Joi.alternatives()
    .try(axisSchema, Joi.array().items(axisSchema))
    .optional()
    .allow(null),

  aggregate: Joi.string()
    .optional()
    .allow(null),

  unit: Joi.string()
    .optional()
    .allow(null),

  bins: Joi.number()
    .optional()
    .allow(null),
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