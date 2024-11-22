import crypto from 'crypto'
import { collection } from '../models/collection.model.js';
import { sendRegistrationEmail } from '../utils/mailsend.utils.js';
import { otpStore } from '../index.js';

const signupaction = async (req, res) => {
  console.log(req.body.name + " came here");
  let message = "";
  const data = new collection(req.body);
  const mail = await collection.find({ email: req.body.email });
  if (mail.length == 0) {
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[0] = {
      otp: otp,
      expiresAt: Date.now() + 300000,
      data: data
    }
    await sendRegistrationEmail(
      "jumathsociety@gmail.com",
      req.body.email,
      "Jadavpur Mathematics Society -- OTP Verification",
      `Your One Time Password is ${otp}`
    )
    res.status(200).send("OK");
  } else {
    res.status(400).send("Not OK");
  }
};

export { signupaction };
