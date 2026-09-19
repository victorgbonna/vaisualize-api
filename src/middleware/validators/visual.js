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

const askDataiSchema = validator(
  Joi.object({
    input: Joi.string().trim().min(1).required(),
    project_details: Joi.object({
      datasets: Joi.array().items(Joi.object()).min(1).required(),
      table_relationships: Joi.array().items(Joi.object()).optional(),
    })
      .required()
      .unknown(true),
  })
);

const filterColumnDefSchema = Joi.object({
  col: Joi.string().required(),
  cat: Joi.string().required(),
  type: Joi.string().required(),
});

const filterTableDefSchema = Joi.object({
  name: Joi.string().required(),
  columns: Joi.array().items(filterColumnDefSchema).min(1).required(),
});

const filterRelationshipDefSchema = Joi.object({
  from_table: Joi.string().required(),
  from_column: Joi.string().required(),
  to_table: Joi.string().required(),
  to_column: Joi.string().required(),
});

const generateFilterPlanSchema = validator(
  Joi.object({
    activeTable: filterTableDefSchema.required(),
    relatedTables: Joi.array().items(filterTableDefSchema).optional(),
    relationships: Joi.array().items(filterRelationshipDefSchema).optional(),
    prompt: Joi.string().trim().min(1).required(),
  })
);

module.exports = {
    deleteVisualSchema,modifyVisualSchema, 
    addVisualSchema, 
    addFiltersSchema,
    massUpdateOnVisualSchema,
    askDataiSchema,
    generateFilterPlanSchema

};
  