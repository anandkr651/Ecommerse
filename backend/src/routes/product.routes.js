import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    createProduct,
    getProduct,
    getProductByCategory,
    getProductByCategoryAndSubCategory,
    getProductDetails,
    updateProduct,
    deleteProduct,
    searchProduct
} from "../controller/product.controller.js";

const router = Router();

router.route("/createProduct").post(verifyJWT, createProduct);
router.route("/getProduct").post(getProduct);
router.route("/getProductByCategory").post(getProductByCategory);
router.route("/getProductByCategoryAndSubCategory").post(getProductByCategoryAndSubCategory);
router.route("/getProductDetails").post(getProductDetails);
router.route("/updateProduct").post(verifyJWT,updateProduct);
router.route("/deleteProduct").delete(verifyJWT,deleteProduct);
router.route("/searchProduct").post(searchProduct);

export default router;
