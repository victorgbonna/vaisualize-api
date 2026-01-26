const Joi = require("joi");
const validator = require("../validator");


const addConvoSchema = validator(
  Joi.object({
    analysis_id: Joi.string().required(),
    content: Joi.string().required()
  })
);
const addConvoPlotsToVisualsSchema = validator(
  Joi.object({
    chat_id: Joi.string().required(),
    analysis_id:Joi.string().optional(),
    visuals: Joi.array().items(
        Joi.object({
          plot_type: Joi.string().required(),
          x: Joi.string().required(),
          y: Joi.string().allow('', null).optional(),
          z: Joi.string().allow('', null).optional(),
          group_by: Joi.string().allow('', null).optional(),
          aggregate: Joi.string().allow('', null).optional(),
        })
    ),    
  })
);

module.exports = {addConvoPlotsToVisualsSchema, addConvoSchema};
  