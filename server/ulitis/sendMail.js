import  nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler'
export const sendMail = asyncHandler(async({email, html}) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"toilanome 👻" <nguyenthanhnamcao392003@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "ForgotPassword ✔", // Subject line
          text: "Hello world?", // plain text body
          html: html, // html body
        });
        return info
       
     
})