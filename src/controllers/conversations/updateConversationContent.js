const Conversation = require("../../model/Conversation");

module.exports = async function (req, res, next) {
  try {
    const { _id, content } = req.body;

    await Conversation.updateOne(
      { _id },
      { content }
    );

    return res
      .status(200)
      .json({ status: "success", message: "Conversation updated" });
  } catch (error) {
    next(error);
  }
};
