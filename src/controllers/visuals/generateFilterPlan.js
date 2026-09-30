const { generateFilterPlan } = require("../../services/chatGPTServices");
const Dataset = require("../../model/Dataset");


const fallback = {
  status: "unsupported",
  message: "That type of filter is not currently supported.",
};

module.exports = async function (req, res, next) {
  try {
    const { activeTable, first_five_rows, relatedTables, relationships, prompt, dataset_id } = req.body;
    // const dataset = await Dataset.findOne({ _id: dataset_id }).lean();
    const result = await generateFilterPlan({
      activeTable,
      relatedTables,
      relationships,
      prompt,
      first_five_rows,
    });

    if (!result || !result.status) {
      return res.status(200).json(fallback);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
