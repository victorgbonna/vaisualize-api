const mongoose = require("mongoose");
const { Schema } = mongoose;

const IntentEnum = [
  "metric",
  "breakdown",
  "ranking",
  "comparison",
  "trend",
  "diagnostic",
  'formalities'
];


const MetricSchema = new Schema({
  aggregate: { type: String, required: true }, 
  column: { type: String, required: true },
  short_note: { type: String }
}, { _id: false });

const FilterSchema = new Schema({
  column: { type: String, required: true },
  filterOpt: { type: String, required: true }, 
  value: { type: Schema.Types.Mixed, required: true },
  short_note: { type: String }
}, { _id: false });

const VisualSchema = new Schema({
  plot_type: { type: String, required: true }, 
  x: { 
    type: String, 
    required: true 
  },

  y: { 
    type: String
  },
  filters: { type: [FilterSchema]},

  group_by: { type: String },

  aggregate: { type: String },

  unit: { type: String },
  short_note: { type: String }

}, { _id: false });


const AnalyticsQuerySchema = new Schema({
  query_id: { type: String, required: true },

  intent: { 
    type: String, 
    enum: IntentEnum, 
    required: true 
  },

  metrics: { type: [MetricSchema] },    
  filters: { type: [FilterSchema]},

  visuals: {                         
    type: [VisualSchema],
    required: true
  },

  order_by: { type: String },          
  limit: { type: Number }            
}, { _id: false });


const ConversationSchema = new Schema({
  analysis_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'request'
  },
  content: { type: String},
  intent: { type: String, enum: IntentEnum },
  role: { 
    type: String, 
    enum: ["user", "assistant"], 
    default:'user',
    required: true 
  },
  confidence: Number,
  queries: [AnalyticsQuerySchema],
  short_note:{ type:String },
  status:{
    type: String, 
    enum:['applied', 'read'],
    default:'read'
  },
},{
    timestamps: true,
});
const Conversation=mongoose.model("conversation", ConversationSchema);
module.exports = Conversation
