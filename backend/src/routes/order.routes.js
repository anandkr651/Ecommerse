import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    CashOnDelivery,
} from "../controller/order.controller.js";

const router = Router();

router.route("/CashOnDelivery").post(verifyJWT, CashOnDelivery);

export default router;