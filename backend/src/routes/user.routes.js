import {Router} from "express";
import {
    registerUser,
    verifyEmailController,
    login,
    logout,
    updateUserAvatar,
    updateProfile,
    updatePassword,
    forgotPassword,
    verifyForgotPasswordOtp,
    resetpassword,
    refreshToken,
    userDetails
} from '../controller/user.controller.js';
import verifyJWT from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verifyEmail").post(verifyEmailController)
router.route("/login").post(login)
router.route("/logout").get(verifyJWT,logout)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/updateProfile").post(verifyJWT,updateProfile)
router.route("/updatePassword").post(verifyJWT,updatePassword)
router.route("/forgotPassword").post(forgotPassword)
router.route("/verifyForgotPasswordOtp").post(verifyForgotPasswordOtp)
router.route("/resetpassword").post(resetpassword)
router.route("/refreshToken").get(verifyJWT,refreshToken)
router.route("/userDetails").get(verifyJWT,userDetails)

export default router;