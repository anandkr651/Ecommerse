import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    createAddToCartItem,
    getCartItem,
    updateCartItemQty,
    deleteCartItemQty,
} from "../controller/cartProduct.controller.js";

const router = Router();

router.route("/createAddToCartItem").post(verifyJWT, createAddToCartItem);
router.route("/getCartItem").get(verifyJWT, getCartItem);
router.route("/updateCartItemQty").put(verifyJWT, updateCartItemQty);
router.route("/deleteCartItemQty").delete(verifyJWT, deleteCartItemQty);

export default router;