const User = require("../../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkUserAccountStatus = require("../../utils/checkUserAccountStatus");

module.exports = async function (req, res, next) {
  try {
    const { body } = req;
    const user = await User.findOne({
        email: body.email,
    }).select('+password').lean();
    if (!user) {
        return res.status(400).json({ error: { message: "Invalid email." } });
    }
    const { error: status_error } = checkUserAccountStatus(user.status);
    if (status_error) {
        return res.status(400).json({ error: status_error });
    }
    if(!user?.password){
        return res.status(400).json({ error: {message:'You do not have a password for this account. Try signing in with Google.'} });
    }
    const isPassword = bcrypt.compare(body.password, user.password);
    if (!isPassword) {
        return res.status(400).json({ error: { message: "Invalid password." } });
    }
    const token =jwt.sign({_id:user._id}, process.env.APP_SECRET_KEY, { expiresIn : '30d' } )
    return res.status(200).json({ status:"success", msg : "Logged in", data:{access_token:token} }) 

} catch (error) {
    console.log({error})
    next(error);
  }
};