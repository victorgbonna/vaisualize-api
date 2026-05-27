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

const createProjectRequestSchema = validator(
  Joi.object({
    project_draft_id: Joi.string(),
    enable_ai_charts: Joi.boolean().default(false),
    
    datasets: Joi.array()
      .items(
        Joi.object({
          proj_title: Joi.string().required(),
          file_name: Joi.string().required(),
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

    // Relationships/Joins
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

    // Visualization Defaults
    visualization_settings: Joi.object({
      defaults: Joi.object({
        background_color: Joi.string()
          .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
          .required(),
        font_color: Joi.string()
          .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
          .required(),
        font_family: Joi.object().required(),
      }).required(),
      chart_colors: Joi.array()
        .items(Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
        .required()
        .min(1),
    }).required(),
  })
);


module.exports = {initializeProjectSchema, createProjectRequestSchema};
  