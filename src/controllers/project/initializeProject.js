const ProjectDraft = require("../../model/ProjectDraft");


module.exports = async function (req, res, next) {
  try {
    const ifProjExists= await ProjectDraft.findOne({title:req.body.title, user_id:req.user._id})
    if(ifProjExists){
      return res.status(400).json({error:{message:'Project name already taken by you. Please choose another.'}})
    }
    const project = new ProjectDraft({...req.body, user_id:req.user._id});
    await project.save();
    
    return res
      .status(200)
      .json({ status: "success", message:"project created", project} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};