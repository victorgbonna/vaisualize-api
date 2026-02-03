const ProjectDraft = require("../../model/ProjectDraft");


module.exports = async function (req, res, next) {
  try {
    const projects= await ProjectDraft.find({user_id:req.user._id})
    return res
      .status(200)
      .json({ status: "success", message:"Project gotten", projects} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};