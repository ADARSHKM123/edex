const nodemailer = require('nodemailer');

const sendEmail =async options=>{
    // 1) Create a transporter
    const transporter =nodemailer.createTransport({
        // service:'Gmail',
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
        //Activate less secure option in gmail
    })


    // 2)Define the email option
    const mailOptoins = { 
        from:'Adarsh <hello@adarsh.io>',
        to:options.email,
        subject:options.subject, 
        text:options.message,
        //html
    } 

    //3)Actually send the email 
   await transporter.sendMail(mailOptoins) 
};

module.exports = sendEmail;