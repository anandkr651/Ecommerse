import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
    addAddress,
    getAddress,
    updateAddress,
    deleteAddress
} from "../controller/address.controller.js";

const router = Router();

router.route("/addAddress").post(verifyJWT, addAddress);
router.route("/getAddress").get(verifyJWT, getAddress);
router.route("/updateAddress").post(verifyJWT, updateAddress);
router.route("/deleteAddress").delete(verifyJWT, deleteAddress);

export default router;