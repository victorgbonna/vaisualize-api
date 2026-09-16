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
    analysis_id:Joi.string().allow('', null),
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

const projectChatRequestSchema = validator(
  Joi.object({
    projectId: Joi.string().required(),
    prompt: Joi.string().trim().min(1).required(),
  })
);

const updateConvoContentSchema = validator(
  Joi.object({
    content: Joi.string().trim().min(1).required(),
  })
);

const createConversationSchema = validator(
    Joi.object({
      datasets: Joi.array()
        .items(
          Joi.object({
            proj_title: Joi.string().required(),
            file_url: Joi.string().required(),
            file_name: Joi.string().required(),
            first_five_rows: Joi.array().items(Joi.object()).required(),
            file_size: Joi.number().required().positive(),
            total_rows: Joi.number().required().integer().positive(),
            columns: Joi.object({
              all_columns: Joi.array().items(Joi.string()).required(),
              active_columns: Joi.array().items(Joi.string()).required(),
              column_data_types: Joi.array()
                .items(
                  Joi.object({
                    col: Joi.string().required(),
                    data_type: Joi.string()
                      .valid('identifier', 'date', 'number', 'string')
                      .required(),
                  })
                )
                .required(),
            }).required(),
          })
        )
        .required()
        .min(1),

      table_relationships: Joi.array()
        .items(
          Joi.object({
            from_table: Joi.string().required(),
            from_column: Joi.string().required(),
            to_table: Joi.string().required(),
            to_column: Joi.string().required()
          })
        )
        .optional()
        .default([]),
      
      title: Joi.string().required()
    })
  );
module.exports = { addConvoSchema, addConvoPlotsToVisualsSchema, createConversationSchema, projectChatRequestSchema, updateConvoContentSchema };
  