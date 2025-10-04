const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    columns: {
        type: Array,
        required:true
    },
    description:{
        type: String,
        required:true,
    },
    goal:{
        type: String,
        required:true,
    },
    indices: {
        type: Array,
        required:true
    },
    sample_data:{
        type: Array,
        required:true
    },
    file_url:{
        type: Array
    },
    email_attached:{
        type: String,
        lowercase: true
    },
    categorical_columns: {
        type: Array,
    },
    numerical_columns: {
        type: Array,
    },
    date_columns: {
        type: Array,
    },
    unique_columns: {
        type: Array,
    },
    suggestions:{
        type: Array,
    },
    status: { 
        type: String, 
        enum:["suspended", "active", "deleted", "break"],
        default:"active"
    },
    chatGPT_response:{
        type: Array,
    }
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("request", RequestSchema);

module.exports = Request;
