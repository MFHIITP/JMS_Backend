import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config();

const sendRegistrationEmail = async (email_from, email_to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: email_from,
    to: email_to,
    subject: subject,
    html: `<div>${email_from}</div><div>${body}</div>`,
  };
  await transporter.sendMail(mailOptions);
};

export {sendRegistrationEmail};