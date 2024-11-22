import { Router } from "express";
import { getdata } from "../controllers/getdata.controller.js";
import { upload } from "../utils/cloudinaryupload.utils.js";
import { imagestore } from "../controllers/imagestore.controller.js";
import { deletefunc } from "../controllers/deletemessage.controller.js";

const router = Router();

router.route('/getchat').post(getdata)
router.route('/imagestore').post(upload.single('image'), imagestore)
router.route('/deletemessage').post(deletefunc)

export default router;