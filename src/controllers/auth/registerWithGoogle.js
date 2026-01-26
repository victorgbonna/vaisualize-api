const User = require("../../model/User");
const jwt = require('jsonwebtoken');
const checkUserAccountStatus = require("../../utils/checkUserAccountStatus");

module.exports = async function (req, res, next) {
  let redirect='sign-up'
  try {
    const {email}= req.body
    const ifUserExists= await User.findOne({email})
    if(ifUserExists){
      redirect='sign-in'
      const { error: status_error } = checkUserAccountStatus(ifUserExists.status);
      if (status_error) {
        return res.status(400).json({ error: {...status_error, redirect} });
      }
      const token =jwt.sign({_id:ifUserExists._id}, process.env.APP_SECRET_KEY, { expiresIn : '30d' } )
      return res.status(200).json({ status:"success", msg : "Logged in", data:{ access_token:token} }) 

    }
    const user = new User({...req.body, status:'active'});
    await user.save();
    const token =jwt.sign({_id:user._id}, process.env.APP_SECRET_KEY, { expiresIn : '30d' } )

    return res
      .status(200)
      .json({ status: "success", message:"Account created", data:{access_code:token}} );
  } catch (error) {
    console.log({error})
    next({...error, redirect});
  }
};