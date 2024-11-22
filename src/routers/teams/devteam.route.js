import {Router} from 'express';
import getdevdata from '../../controllers/teams/devteam/getdata.js';
import adddevperson from '../../controllers/teams/devteam/adddevperson.js';

const router = Router();
router.route('/getdevteamdata').get(getdevdata);
router.route('/deletedevperson').post();
router.route('/adddevperson').post(adddevperson);

export default router;