const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectDraftSchema = new Schema(
  {
    title:{
        type: String,
        required:true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    category:{
        type: String,
        default:'general'
    },
    mode:{
        type: String,
        default:'Public'
    },
    
    description:{
        type: String,
    },
    
  },
  {
    timestamps: true,
  }
);


const ProjectDraft = mongoose.model("project_draft", ProjectDraftSchema);

module.exports = ProjectDraft;





