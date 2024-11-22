import {Router} from 'express'
import { signupaction } from '../controllers/signup.controller.js';
import { otpVerify } from '../controllers/verifyOTP.controller.js';
import adminfunction from '../controllers/admins.controller.js';
import  deletefunc  from '../controllers/deleteuser.controller.js';
import updatefunc from '../controllers/update.controller.js';
const router = Router();

// const func = (req, res, next)=>{
//     console.log("Middleware");
//     next();
// }

router.route("/signup").post(signupaction);
router.route("/verifyOTP").post(otpVerify)
router.route("/admins").get(adminfunction);
router.route("/deleteuser").post(deletefunc)
router.route("/update").post(updatefunc)
export default router;