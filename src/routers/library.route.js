import {Router} from 'express'
import getbooks from '../controllers/getbooks.controller.js';
import addbooks from '../controllers/addbooks.controller.js';

const router = Router();
router.route('/books').get(getbooks);
router.route('/books').post(addbooks);

export default router;