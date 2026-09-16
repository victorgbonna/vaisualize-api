const mongoose = require("mongoose");
const Project = require("../model/Project");

module.exports = async function requireProjectAccess(req, res, next) {
  try {
    const projectId = req.params.projectId || req.body?.projectId;
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({
        error: { message: "A valid projectId is required." },
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { user_id: userId },
        { shared_guest_with: userId },
        { shared_edited_with: userId },
        { mode: { $in: ["public", "Public"] } },
      ],
    }).populate("datasets").lean();

    if (!project) {
      return res.status(404).json({
        error: { message: "Project does not exist or you do not have permission to access this project." },
      });
    }

    req.project = project;
    next();
  } catch (error) {
    next(error);
  }
};