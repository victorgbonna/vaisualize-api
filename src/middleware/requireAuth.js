const jwt = require('jsonwebtoken')
const User = require('../model/User')
const checkUserAccountStatus = require('../utils/checkUserAccountStatus')
const consolelog = require('../utils/consolelog')

const requireAuth = async ( req, res, next ) => {

    //VERIFY AUTHENTICATION
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json( { error: "Authorization token required" } )
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify( token, process.env.APP_SECRET_KEY )
       
        let user = await User.findOne({_id})  

        const { error: status_error } = checkUserAccountStatus(user.status);
        if (status_error) {
            return res.status(400).json({ error: status_error });
        }
        req.user=user
        next()

    }catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized', status:"unauthorized" })
    }

}

module.exports = requireAuth