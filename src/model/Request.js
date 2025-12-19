const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    columns: {
        type: Array,
        required:true
    },
    title:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        default:'general'
    },
    mode:{
        type: String,
        default:'public'
    },
    category:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    goal:{
        type: String,
        required:true,
    },
    // index_column: {
    //     type: String
    // },
    sample_data:{
        type: Array,
        required:true
    },
    file_url:{
        type: Array,
        required:true
    },
    email_attached:{
        type: String,
        lowercase: true
    },
    // fullName:{
    //     type: String,
    // },
    // whatsapp_line:{
    //     type: String,
    // },
    // country:{
    //     type: String,
    // },
    categorical_columns: {
        type: Array,
        required:true
    },
    numerical_columns: {
        type: Array,
        required:true
    },
    date_columns: {
        type: Array,
        required:true
    },
    unique_columns: {
        type: Array,
        required:true    
    },
    non_placed_columns: {
        type: Array,
        required:true
    },
    all_columns: {
        type: Array,
        required:true
    },
    suggestions:{
        type: Array,
    },
    status: { 
        type: String, 
        enum:["suspended", "active", "deleted", "break", 'pending'],
        default:"break"
    },
    chatGPT_response:{
        type: Array,
    },
    visuals_obj:{
        type: Object,
        required:true
    },
    active_filter:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'filter'
    }
  },
  {
    timestamps: true,
  }
);
const populateFilter = function (next) {
    this.populate(
      "active_filter",
      "_id name filters"
    );
    next();
  };
  
RequestSchema.pre("find", populateFilter)
.pre("findOne", populateFilter)

const Request = mongoose.model("request", RequestSchema);

module.exports = Request;





