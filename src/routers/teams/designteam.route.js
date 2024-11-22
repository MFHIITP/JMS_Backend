import {Router} from 'express';
import getdata from '../../controllers/teams/designteam/getdata.js'
import addperson from '../../controllers/teams/designteam/adddesignperson.js';

const router = Router();
router.route('/getdedignteamdata').get(getdata)
router.route('/adddesignperson').post(addperson);

export default router;