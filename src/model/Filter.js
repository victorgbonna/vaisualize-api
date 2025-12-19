const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectfilterSchema = new Schema(
    {
        column: { type: String , required:true},
        filterOpt:{type: String, required:true},
        value:{ type: String, required:true},
    }
)
const FilterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    req_id: {
      type: String,
      required: true,
    },
    filters: {
      type: [[objectfilterSchema]],
      required: true
    }},
  {
    timestamps: true,
  }
);

const Filter = mongoose.model("filter", FilterSchema);

module.exports = Filter;