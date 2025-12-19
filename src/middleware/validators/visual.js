const Joi = require("joi");
const validator = require("../validator");


const modifyVisualSchema = validator(
  Joi.object({
    plot_type: Joi.string().required(),
    title: Joi.string().required(),
    x: Joi.when('plot_type', {
      is: Joi.valid('matrix heatmap', 'radar chart'),
      then: Joi.array().items(Joi.string()).min(1).required(),
      otherwise: Joi.string().required(),
    }),
    y: Joi.string().allow('', null).optional(),
    z: Joi.string().allow('', null).optional(),
    why: Joi.string().allow('', null).optional(),
    description:Joi.string().allow('', null).optional(),
    group_by: Joi.string().allow('', null).optional(),
    aggregate: Joi.string().allow('', null).optional(),
    unit: Joi.string().allow('', null).optional(),
    chartInd: Joi.number().required(),
    mainId: Joi.string().required(),
  })
);
const massUpdateOnVisualSchema= validator(
  Joi.object({
    new_visuals: Joi.array()
      .items(
        Joi.object({
          plot_type: Joi.string().required(),
          x: Joi.string().required(),
          y: Joi.string().allow('', null).optional(),
          z: Joi.string().allow('', null).optional(),
          group_by: Joi.string().allow('', null).optional(),
          aggregate: Joi.string().allow('', null).optional(),
        })
    ),    
    mainId: Joi.string().required(),
  })
)
const deleteVisualSchema = validator(
  Joi.object({
    chartInd: Joi.number().required(),
    mainId:Joi.string().required()
  })
);
const addVisualSchema = validator(
  Joi.object({
    mainId: Joi.string().required(),
  })
);
const filterItemSchema = Joi.object({
  column: Joi.string().required(),
  filterOpt: Joi.string().required(),
  value: Joi.any().required(),
});

const addFiltersSchema = validator(
    Joi.object({
        name:Joi.string().required(),
        req_id: Joi.string().required(),
        filters: Joi.array()
        .items(
        Joi.array()
            .items(filterItemSchema)
            .min(1)
        )
        .min(1)
        .required()
    })
)

module.exports = {
    deleteVisualSchema,modifyVisualSchema, 
    addVisualSchema, 
    addFiltersSchema,
    massUpdateOnVisualSchema

};
  