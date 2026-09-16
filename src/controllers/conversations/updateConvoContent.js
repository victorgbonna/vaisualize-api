const Conversation = require("../../model/Conversation");

module.exports = async function (req, res, next) {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: { message: "Conversation not found." } });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Conversation updated", conversation });
  } catch (error) {
    next(error);
  }
};
