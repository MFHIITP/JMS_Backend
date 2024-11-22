import { Router } from "express";
import getdata from '../../controllers/teams/contentteam/getdata.js'
import addperson from "../../controllers/teams/contentteam/addcontentperson.js";

const router = Router();
router.route('/getcontentteamdata').get(getdata);
router.route('/addcontentperson').post(addperson);

export default router;