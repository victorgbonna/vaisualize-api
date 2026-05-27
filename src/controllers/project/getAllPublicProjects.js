const Project = require("../../model/Project");

module.exports = async function (req, res, next) {
  try {
    const projects = await Project.find({ mode: 'public' }).lean();
    return res.status(200).json({ status: "success", message: "Public projects fetched", projects });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
