/**
 * Project Creation Request Body
 * Collates all state variables from ProjectDataContext and step components
 */

const createProjectRequestBody = {
  // Basic Project Info
  project_id: router?.query?.id,  // For draft updates
  project_name: project_data?.project?.title,
  
  // Datasets Configuration
  datasets: dataCollection.map(dataset => ({
    file_name: dataset.fileName,
    file_size: dataset.size,
    total_rows: dataset.row_length,
    columns: {
      all_columns: dataset.col.all_columns,
      active_columns: dataset.col.columns,
      column_data_types: dataset.col_data_type.map(cd => ({
        column_name: cd.col,
        data_type: cd.data_type  // 'identifier' | 'date' | 'number' | 'string'
      }))
    }
  })),
  
  // Relationships/Joins
  table_relationships: relationships.map(rel => ({
    from_table: rel.from_table,
    from_column: rel.from_column,
    to_table: rel.to_table,
    to_column: rel.to_column,
    join_type: "INNER_JOIN"  // Default as shown in UI
  })),
  
  // Visualization Defaults
  visualization_settings: {
    defaults: {
      background_color: defaults.background_color,
      font_color: defaults.font_color,
      font_family: defaults.font_family,
      enable_ai_charts: defaults.enable_ai_charts || false
    },
    chart_colors: chartColors,
    default_chart_color: chartColors[0] || '#4FC3F7'
  },
  
  // Workflow Status
  current_step: step,
  is_draft: true/false
};