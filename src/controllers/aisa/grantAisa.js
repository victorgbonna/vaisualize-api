const Aisa = require("../../model/Aisa");

module.exports = async function grantAisa(req, res, next) {
  try {
    const aisa = await Aisa.updateOne(
      { _id: req.params.id, status: "entered" },
      { status: "granted" },
    );

    if (!aisa) {
      return res.status(404).json({
        status: "error",
        message: "This request was not found or has already been processed.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: `${aisa.email} has been granted access. The access email will be sent shortly.`,
      data: { aisa },
    });
  } catch (error) {
    next(error);
  }
}