const nodemailer = require('nodemailer');
const emailusername = 'smartgenix7@gmail.com';
const emailpassword = 'amzklnjxtyqfjjyw';


const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: emailusername,
        pass: emailpassword
    },
    host: 'smtp.gmail.com'

});

module.exports = transporter;