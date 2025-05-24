import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { uploadImageController } from "../controller/uploadImage.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/upload").patch(verifyJWT, upload.single("image"), uploadImageController);

export default router;
