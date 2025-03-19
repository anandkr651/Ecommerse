import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    addSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
} from "../controller/subCategory.controller.js";

const router = Router();

router.route("/addSubCategory").post(verifyJWT, addSubCategory);
router.route("/get").post(getSubCategory);
router.route("/updateSubCategory").post(verifyJWT, updateSubCategory);
router.route("/deleteSubCategory").delete(verifyJWT, deleteSubCategory);

export default router;
