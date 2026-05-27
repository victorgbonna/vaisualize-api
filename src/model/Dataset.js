const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumnDataTypeSchema = new Schema({
  col: { type: String, required: true },
  data_type: {
    type: String,
    enum: ['identifier', 'date', 'number', 'string'],
    required: true
  }
}, { _id: false });

const ColumnsSchema = new Schema({
  all_columns: [{ type: String, required: true }],
  active_columns: [{ type: String, required: true }],
  column_data_types: { type: [ColumnDataTypeSchema], required: true }
}, { _id: false });

const DatasetSchema = new Schema(
  {
    file_name: { type: String, required: true },
    file_size: { type: Number, required: true },
    total_rows: { type: Number, required: true },
    columns: { type: ColumnsSchema, required: true },
    proj_title: {
      type: String,
        required:true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    
    url_collection:{
      type: Array,
    },
    
    table:{
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dataset = mongoose.model("dataset", DatasetSchema);

module.exports = Dataset;





