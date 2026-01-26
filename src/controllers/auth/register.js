const User = require("../../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async function (req, res, next) {
  try {
    const {body}= req
    const ifUserExists= await 
        User.findOne({$or: [
            { phone: body.phone }, 
            { email: body.email }
        ]})

    if (ifUserExists && ifUserExists.email===body.email) {
    return res.status(400).json({
        error: { message: "Email Already Exists" }
    });
    }

    if (ifUserExists && ifUserExists.phone===body.phone) {
    return res.status(400).json({
        error: { message: "Phone Already Exists" }
    });
    }
    const salt = await bcrypt.genSalt(10);
    
    body.password = await bcrypt.hash(body.password, salt);

    const user = new User(req.body);
    await user.save();

    const token =jwt.sign({_id:user._id}, process.env.APP_SECRET_KEY, { expiresIn : '30d' } )

    return res
      .status(200)
      .json({ status: "success", message:"Account created", data:{access_code:token}} );
  } catch (error) {
    console.log({error})
    next(error);
  }
};