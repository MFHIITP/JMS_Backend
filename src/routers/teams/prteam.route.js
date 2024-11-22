import { Router } from "express";
import addata from '../../controllers/teams/prteam/getdata.js'
import addperson from '../../controllers/teams/prteam/addpr.js'

const router = Router();
router.route('/getprteamdata').get(addata);
router.route('/addprperson').post(addperson);
export default router;