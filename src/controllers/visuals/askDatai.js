const { generateDataIChartConfiguration } = require("../../services/chatGPTServices");

const errorResponse = {
  error: {
    message: "A valid chart configuration could not be generated from the available project data.",
  },
};

module.exports = async function (req, res, next) {
  try {
    const { input, project_details } = req.body || {};

    if (typeof input !== "string" || !project_details || !Array.isArray(project_details.datasets)) {
      return res.status(400).json(errorResponse);
    }

    const result = await generateDataIChartConfiguration({ input, project_details });
    if (!result || (result.error && result.error.message)) {
      return res.status(200).json(result?.error ? result : errorResponse);
    }

    if (!result.formData || !isValidConfiguration(result.formData, project_details)) {
      return res.status(200).json(errorResponse);
    }

    return res.status(200).json({ formData: result.formData });
  } catch (error) {
    next(error);
  }
};

function isValidConfiguration(formData, projectDetails) {
  const datasets = projectDetails.datasets;
  const chartTypes = new Set([
    "bar chart",
    "line chart",
    "area chart",
    "pie chart",
    "scatter plot",
    "bubble chart",
    "histogram",
    "box plot",
    "violin plot",
    "radar chart",
    "matrix heatmap",
  ]);
  const datasetMap = new Map(datasets.map((dataset) => [
    dataset.file_name,
    new Map((dataset.columns?.column_data_types || []).map((column) => [column.col, column.data_type])),
  ]));
  const getType = (field) => field && datasetMap.get(field.table)?.get(field.col);
  const isField = (field) => Boolean(field && field.table && field.col && getType(field));
  const isNumber = (field) => getType(field) === "number";
  const isCategory = (field) => ["string", "identifier"].includes(getType(field));
  const isDate = (field) => getType(field) === "date";
  const isEmpty = (field) => field === "" || field === null || typeof field === "undefined";

  if (!formData || typeof formData.title !== "string" || !chartTypes.has(formData.chartType) || !isField(formData.x)) {
    return false;
  }

  const related = (field) => {
    if (isEmpty(field)) return true;
    if (!isField(field)) return false;
    if (field.table === formData.x.table) return true;
    return (projectDetails.table_relationships || []).some((relationship) =>
      (relationship.from_table === formData.x.table && relationship.to_table === field.table) ||
      (relationship.to_table === formData.x.table && relationship.from_table === field.table)
    );
  };

  if (![formData.y, formData.z, formData.group_by].every(related)) return false;
  if (!isEmpty(formData.y) && !isField(formData.y)) return false;
  if (!isEmpty(formData.z) && !isField(formData.z)) return false;
  if (!isEmpty(formData.group_by) && !isField(formData.group_by)) return false;

  const yNumber = isNumber(formData.y);
  const xNumber = isNumber(formData.x);
  const xCategory = isCategory(formData.x);
  const xDate = isDate(formData.x);
  const yCategory = isCategory(formData.y);
  const validAggregate = ["count", "sum", "average", "max", "min", "mode"].includes(formData.aggregate);
  const validUnit = ["", "minute", "minutes", "second", "seconds", "hour", "hours", "day", "days", "week", "weeks", "month", "months"].includes(formData.unit);

  if (!validUnit || (!xDate && formData.unit !== "")) return false;
  if (formData.aggregate !== "count" && !yNumber) return false;
  if (!validAggregate) return false;

  switch (formData.chartType) {
    case "bar chart": return (xCategory || xDate) && (isEmpty(formData.y) || yNumber);
    case "line chart":
    case "area chart": return xDate && (isEmpty(formData.y) || yNumber);
    case "pie chart": return xCategory;
    case "scatter plot": return xNumber && yNumber;
    case "bubble chart": return xNumber && yNumber && isNumber(formData.z);
    case "histogram": return xNumber;
    case "box plot":
    case "violin plot": return xCategory && yNumber;
    case "radar chart":
    case "matrix heatmap": return Array.isArray(formData.x) && formData.x.length > 1 && yCategory;
    default: return false;
  }
}
