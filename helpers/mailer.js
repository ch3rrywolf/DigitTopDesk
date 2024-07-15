const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async(email, subject, content) => {
    try{
        var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        };

        WebTransportError.sendMAil(mailOptions, (erro, info) => {
            if(error){
                console.log(error);
            }

            console.log('Mail has been sent ', info.messageId);
        });

    } catch(error){
        console.log(error.message);
    }
}

module.exports = {
    sendMail
}