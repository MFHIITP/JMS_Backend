import { Router } from "express";
import addata from '../../controllers/teams/discipline/getdata.js';
import addperson from "../../controllers/teams/discipline/adddispperson.js";

const router = Router();
router.route('/getdisciplineteamdata').get(addata);
router.route('adddisciplineperson').post(addperson);
export default router;