const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'warmtugas21@gmail.com',
        pass: 'tugastugas21'
    }
});



module.exports = transporter