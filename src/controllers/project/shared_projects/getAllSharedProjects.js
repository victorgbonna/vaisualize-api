const Project = require("../../../model/Project");

module.exports = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const projects = await Project.find({
      $or: [
        { shared_guest_with: userId },
        { shared_edited_with: userId },
        { mode: 'public' }
      ]
    }).lean();
    return res.status(200).json({ status: "success", message: "Shared projects fetched", projects });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
