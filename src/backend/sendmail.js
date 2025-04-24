const nodemailer = require("nodemailer");
require("dotenv").config();

console.log(process.env.USER);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER, 
      pass: process.env.APP_PASSWORD, // getting an app password is more secured 
    },
});

const mailOptions = {
    from: {
        name: 'Sandamini',
        address: process.env.USER
    },
    to: ["e19224@eng.pdn.ac.lk"],
    subject: "ALERT!! Check the dashboard",
    html: "<b>One or more sites have been down. Please check the dashboard!</b>"
}

const sendMail = async function() {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Yayy.. Email is sent!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendMail
};