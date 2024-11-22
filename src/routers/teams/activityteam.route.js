import { Router } from "express";
import addata from '../../controllers/teams/activityteam/getdata.js'
import addperson from '../../controllers/teams/activityteam/addactivityperson.js';
const router = Router();
router.route('/getactivityteamdata').get(addata);
router.route('/addactivityperson').post(addperson);

export default router;