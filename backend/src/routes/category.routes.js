import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    AddCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from "../controller/category.controller.js";

const router = Router();

router.route("/addCategory").post(verifyJWT, AddCategory);
router.route("/getCategory").get(verifyJWT, getCategory);
router.route("/updateCategory").post(verifyJWT, updateCategory);
router.route("/deleteCategory").delete(verifyJWT, deleteCategory);

export default router;
