import { sendRegistrationEmail } from "../utils/mailsend.utils.js";

const SendQuery = async (req, res) => {
  await sendRegistrationEmail(req.body.email, "jumathsociety@gmail.com", req.body.subject, req.body.message);
  res.status(200).send("Sent");
};

export {SendQuery}