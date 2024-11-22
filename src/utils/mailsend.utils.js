import nodemailer from "nodemailer";

const sendRegistrationEmail = async (email_from, email_to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jumathsociety@gmail.com",
      pass: "yzoo hoot gfvt eujs",
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