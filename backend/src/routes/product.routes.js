import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { createProduct, getProduct } from "../controller/product.controller.js";

const router = Router();

router.route("/createProduct").post(verifyJWT, createProduct);
router.route("/getProduct").post(getProduct);

export default router;
