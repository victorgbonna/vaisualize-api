const nodemailer = require("nodemailer")
const handlebars = require("handlebars")
const path= require("path")
const fs= require("fs");
const { MAIL_PASS, MAIL_EMAIL } = require("../configs/constants");
const consolelog = require("./consolelog");


module.exports = async function sendEmailToUser(
    {tempPath,replacements, mailTo, subject,customHTML}
) {
    // console.log({MAIL_EMAIL, MAIL_PASS, mailTo, tempPath,replacements})
    if(!MAIL_EMAIL || !MAIL_PASS || !mailTo) return
    // if(process.env.NODE_ENV==="development") return
    // return
    let htmlToSend=customHTML
    if(!customHTML){
        const filePath = path.join(appRoot, tempPath);
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
    
        htmlToSend = template({...replacements, year:new Date().getFullYear()});
    }

    // const htmlToSend = template({...replacements, year:new Date().getFullYear()});
    try {

        let mailTransporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth:{
                user: MAIL_EMAIL,
                pass: MAIL_PASS
            }
        })        
        let details = {
            from: `Climax Properties Ng ${MAIL_EMAIL}`,
            // to: mailTo,
            subject,
            html:htmlToSend,
            ...(typeof mailTo ==="string"?{to:mailTo}:{bcc:mailTo})
        }
        try {
            await mailTransporter.sendMail(details)
            
        } catch (error) {
            consolelog({error})            
            return {error:true}

        }
        // console.log({emailDetails})
    } catch (e) {
        
    }
    return
    //one has to create an app password
    // let mailTransporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   auth: {
    //     user: 'cordelia85@ethereal.email',
    //     pass: 'vcCnAHvXuHTH6fHC2h'
    //   }
    // })
    // var maillist = [
    //   '****.sharma3@****.com',
    //   '****.bussa@****.com',
    //   '****.gawri@****.com',
    // ];
    // mailTransporter.sendMail(details, (err, info)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log('Mail successfully sent', info.response)
    //     }
    // })
};