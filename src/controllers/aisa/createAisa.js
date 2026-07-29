const Aisa = require("../../model/Aisa");
const sendEmailToUser = require("../../utils/sendEmailToUser");

const ADMIN_EMAIL = "ai.simplified.academy@gmail.com";
// ${req.protocol}://${req.get("host")}
function getGrantUrl(req, aisaId) {
  return `https://vaisualize-api.onrender.com/aisa/${aisaId}/grant`;
}

module.exports = async function createAisa(req, res, next) {
  try {
    const aisa = await Aisa.create({
      email: req.body.email,
      status: "entered",
    });

    const emailResult = await sendEmailToUser({
      mailTo: ADMIN_EMAIL,
      subject: "New Aisa file access request",
      tempPath: "public/views/aisaRequestNotification.html",
      replacements: {
        email: aisa.email,
        grantUrl: getGrantUrl(req, aisa._id),
      },
    });

    if (emailResult && emailResult.error) {
      console.error("Could not send Aisa request notification:", emailResult.message);
    }
    
    return res.status(201).json({
      status: "success",
      message: "Aisa entry created",
      data: { aisa },
    });
  } catch (error) {
    next(error);
  }
};


