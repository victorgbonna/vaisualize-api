const Aisa = require("../../model/Aisa");
const sendEmailToUser = require("../../utils/sendEmailToUser");

const ADMIN_EMAIL = "ai.simplified.academy@gmail.com";

function getGrantUrl(req, aisaId) {
  return `${req.protocol}://${req.get("host")}/aisa/${aisaId}/grant`;
}

module.exports = async function createAisa(req, res, next) {
  try {
    //find if exists
    // const existingAisa = await Aisa.findOne({ email: req.body.email, status:'granted' });
    // if (existingAisa) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Aisa entry already exists for this email.",
    //   });
    // }

    const aisa = await Aisa.create({
      email: req.body.email,
      status: "entered",
    });

    console.log("Aisa entry created:", aisa);
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


