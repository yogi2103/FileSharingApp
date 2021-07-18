const nodemailer = require('nodemailer');

async function sendMail({from, To, subject, text, html}){
    console.log(from,To);
    let transporter= nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: `FileShare <${from}>`,
        to: To,
        subject: subject,
        text: text,
        html: html
    });

    console.log(info);
}

module.exports=sendMail;