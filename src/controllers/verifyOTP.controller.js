import { otpStore } from "../index.js"
import { sendRegistrationEmail } from "../utils/mailsend.utils.js";
import dotenv from 'dotenv'
dotenv.config()

const otpVerify = async(req, res)=>{
    const data = otpStore[0].data;
    if(req.body.otp == otpStore[0].otp && Date.now() < otpStore[0].expiresAt){
        delete otpStore[0];
        await data.save();
        await sendRegistrationEmail(
            process.env.GMAIL_USER,
            data.email,
            "Jadavpur Mathematics Society",
            "<div>Welcome to Jadavpur Mathematics Society. Wish you a very happy time at Jadavpur Mathemtics Society.</div><br><div>Regards,</div><div>Farshid Hossain</div><div>Secretary</div>"
        )
        res.status(200).send("OK")
    }
    else{
        delete otpStore[0];
        res.status(400).send("NOT OK")
    }
}

export {otpVerify}