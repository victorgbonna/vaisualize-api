const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisualizationDefaultsSchema = new Schema({
  background_color: { type: String, required: true },
  font_color: { type: String, required: true },
  font_family: { type: Object, required: true },
}, { _id: false });

const VisualizationSettingsSchema = new Schema({
  defaults: { type: VisualizationDefaultsSchema, required: true },
  chart_colors: [{ type: String, required: true }],
}, { _id: false });

const TableRelationshipSchema = new Schema({
  from_table: { type: String, required: true },
  from_column: { type: String, required: true },
  to_table: { type: String, required: true },
  to_column: { type: String, required: true },
}, { _id: false });

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    category: { type: String, default: 'general' },
    mode: { type: String, default: 'Public' },
    description: { type: String },
    visualization_settings: { type: VisualizationSettingsSchema, required: true },
    table_relationships: [{ type: TableRelationshipSchema }],
    active_filter: { type: mongoose.Schema.Types.ObjectId, ref: 'filter' },
    visualizations: { type: Object, required: false },
    datasets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dataset', required: true }],
    shared_guest_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    shared_edited_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;





