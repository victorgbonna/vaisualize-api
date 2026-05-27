const Dataset = require("../../model/Dataset");
const Project = require("../../model/Project");
const ProjectDraft = require("../../model/ProjectDraft");


module.exports = async function (req, res, next) {
  try {
    const project= await ProjectDraft.findOne({_id:req.body.project_draft_id, user_id:req.user._id}).lean()
    if(!project){
      return res.status(400).json({error:{message:'Project does not exist.'}})
    }

    const {body}= req
    const datasets_in_db = await Dataset.insertMany(body.datasets);
    
    const datasets_ids = datasets_in_db.map(d => d._id);

    const schema_body={
        title: project.title,
        user_id: project.user_id,
        category: project.category,
        mode: project.mode,
        description: project.description,
        relationships: body.table_relationships,
        defaults:body.defaults,
        datasets: datasets_ids,
        visualization_settings: body.visualization_settings,
    }
    const new_project = new Project(schema_body);
    await new_project.save();

    await ProjectDraft.deleteOne({_id:req.body.project_draft_id});
    if(project.enable_ai_charts){
      // Trigger AI chart generation logic here (e.g., send message to queue)
    } 
    return res
      .status(200)
      .json({ status:  "success", message:"Project created", project_id:new_project._id });
  } catch (error) {
    console.log({error})
    next(error);
  }
};