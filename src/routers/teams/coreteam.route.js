import { Router } from "express";
import addata from '../../controllers/teams/core/getdata.js'
import addperson from '../../controllers/teams/core/addcoreperson.js'

const router = Router();
router.route('/getcoreteamdata').get(addata);
router.route('/addcoreperson').post(addperson);
export default router;