const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fedemarcheg@gmail.com',
        pass: 'fede2328',
    },
});

module.exports = transporter;