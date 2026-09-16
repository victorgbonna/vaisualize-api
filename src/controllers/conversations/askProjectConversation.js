const Conversation = require("../../model/Conversation");
const {
  generateDataIChatResponse,
} = require("../../services/chatGPTServices");

module.exports = async function askProjectConversation(req, res, next) {
  try {
    const {
      existingConversations = [],
      project,
      datasets,
      relationships,
    } = req.body;

    await Conversation.create({
      user_id: req.user._id,
      project_id: req.project._id,
      role: "user",
      content: req.body.prompt,
    });

    const context = [
      ...[...existingConversations].reverse().map((conversation) => ({
        role: conversation.role,
        content: conversation.content,
      })),
      {
        role: "user",
        content: req.body.prompt,
      },
    ];

    const answer = await generateDataIChatResponse({
      project,
      datasets,
      relationships,
      conversation: context,
    });
    const ai_response={
      user_id: req.user._id,
      project_id: req.project._id,
      role: "assistant",
      content: answer.response.template,
      ...answer,
    }
    await Conversation.create(ai_response);

    return res.status(200).json({
      status: "success",
      message: "Conversation response generated",
      data: {
        ai_response,
      },
    });
  } catch (error) {
    next(error);
  }
};