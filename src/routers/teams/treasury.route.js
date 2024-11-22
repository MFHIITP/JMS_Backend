import { Router } from "express";
import addata from '../../controllers/teams/treasury/getdata.js'
import addperson from '../../controllers/teams/treasury/addtresury.js'

const router = Router();
router.route('/gettreasuryteamdata').get(addata);
router.route('/addtreasuryperson').post(addperson);
export default router;