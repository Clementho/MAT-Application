require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.error("Error connecting to Gmail SMTP:", error);
    } else {
      console.log("Gmail SMTP connected successfully:", success);
    }
  })

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;