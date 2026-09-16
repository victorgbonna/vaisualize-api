const Conversation = require("../../model/Conversation");

module.exports = async function getProjectConversations(req, res, next) {
  try {
    const conversations = await Conversation.find({ project_id: req.project._id })
      .sort({ createdAt: -1 })
      // .limit(8)
      // .populate('project', '_id title')
      .lean();

      // const chats = conversations.reverse().map((conversation) => ({
      //   id: conversation._id.toString(),
      //   role: conversation.role,
      //   content: conversation.content,
      // }));

    return res.status(200).json({
      status: "success",
      message: "Conversations gotten",
      chats: conversations,
    });
  } catch (error) {
    next(error);
  }
};