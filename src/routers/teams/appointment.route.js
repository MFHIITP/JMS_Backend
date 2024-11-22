import Router from 'express';
import getdata from '../../controllers/teams/appointment/getdata.js'
import addperson from '../../controllers/teams/appointment/addappointperson.js'

const router = Router();
router.route('/getappointmentteamdata').get(getdata);
router.route('/addappointmentperson').post(addperson);

export default router;