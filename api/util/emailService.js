const nodemailer = require('nodemailer')
require("dotenv").config();


export async function sendEmail(messageToSend){
   let  {senderEmail,recipientEmail, message, subject} = messageToSend;

   const initialization = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }});

     initialization.sendMail({
        from:senderEmail,
        to:recipientEmail,
        subject:subject,
        text:message
    }, (error, info)=>{
        if(error) {
             console.log(error);
        }else{
            return info
        }
    });

}



// https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MJD6Sjnz593TvmZu9qyH4x_Yz-vbWZc3BDjrBvBsU77nVUtLDbnpsqGURbL0ZTHF8o-5cWClwLUaU6RrxezwzLa_PH-g





