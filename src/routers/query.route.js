import {Router} from 'express'
import { SendQuery } from '../controllers/query.controller.js';

const router = Router();

router.route("/sendquery").post(SendQuery)

export default router;
