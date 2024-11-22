import { Router } from "express";
import addata from '../../controllers/teams/executive/getdata.js'
import addperson from '../../controllers/teams/executive/addexecperson.js'
const router = Router();

router.route('/getexecutiveteamdata').get(addata);
router.route('/addexecutiveperson').post(addperson);

export default router;