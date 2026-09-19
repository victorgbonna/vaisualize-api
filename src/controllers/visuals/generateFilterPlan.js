const { generateFilterPlan } = require("../../services/chatGPTServices");

const fallback = {
  status: "unsupported",
  message: "That type of filter is not currently supported.",
};

module.exports = async function (req, res, next) {
  try {
    const { activeTable, relatedTables, relationships, prompt } = req.body;

    const result = await generateFilterPlan({
      activeTable,
      relatedTables,
      relationships,
      prompt,
    });

    if (!result || !result.status) {
      return res.status(200).json(fallback);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
