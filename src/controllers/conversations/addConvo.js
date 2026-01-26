const Conversation = require("../../model/Conversation");

module.exports = async function (req, res, next) {
  try {
    const {analysis_id, content}= req.body
    const new_convo = new Conversation(req.body);
    await new_convo.save();

    const ai_reply= new Conversation({
        analysis_id, role:'assistant', short_note:'<p>done seen</p>'
    })
    await ai_reply.save();
    return res
      .status(200)
      .json({ status: "success", message:"Conversations created", chat:ai_reply });
  } catch (error) {
    console.log({error})
    next(error);
  }
};