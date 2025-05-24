import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../../config/sendmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import { deleteOnCloudinary } from "../utils/deleteOnCloudinary.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generateOTP from "../utils/generateOTP.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (
            [name, email, password].some(
                (field) => !field || field.trim() === ""
            )
        ) {
            return res.status(400).json({
                message: "Provide email, name and password",
                error: true,
                success: false,
            });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "email is allready exist",
                error: true,
                success: false,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const createUser = await User.findById(user._id).select("-password");
        if (!createUser) {
            return res.status(500).json({
                message: "something went wrong while registering the user",
                error: true,
                success: false,
            });
        }

        // i can use Resend for email.
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verifyEmail?code=${user?._id}`;
        const verificationEmail = await sendEmail({
            sendTo: email,
            subject: "verify email from blinkit",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl,
            }),
        });

        return res.status(201).json({
            message: "User registered successfully",
            data: createUser,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const verifyEmailController = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findOne({ _id: code });
        if (!user) {
            return res.status(500).json({
                message: "invalid code",
                error: true,
                success: false,
            });
        }
        const updateUser = await User.updateOne({ _id: code },
            {
                verifyEmail: true,
            }
        );
        return res.status(200).json({
            message: "Email verify successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field) => !field || field.trim() === "")) {
            return res.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false,
            });
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact to the admin",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false,
            });
        }
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updateUser = await User.findByIdAndUpdate(user._id, {
            lastLoginDate: new Date().toLocaleString(),
        });

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                message: "login successfully",
                error: false,
                success: true,
                data: {
                    accessToken,
                    refreshToken,
                },
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            { new: true }
        );
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };
        return res
            .status(200)
            .clearCookie("accessToken", option)
            .clearCookie("refreshToken", option)
            .json({
                message: "User logged out",
                error: false,
                success: true,
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const updateUserAvatar = async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        return res.status(500).json({
            message: "avatar file is missing",
            success: false,
            error: true,
        });
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
        return res.status(500).json({
            message: "error while uploading on avatar",
            success: false,
            error: true,
        });
    }
    const currentUser = await User.findById(req.user._id);
    // console.log(currentUser.avatar);

    if (currentUser.avatar) {
        const currentAvatar = currentUser.avatar;
        const deleteAvatar = currentAvatar.split("/").pop().split(".")[0];
        if (deleteAvatar) {
            console.log("delete image on cloudinary");
            await deleteOnCloudinary(deleteAvatar);
        }
    }
    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                avatar: avatar.url,
            },
        },
        { new: true}
    );
    return res.status(200).json({
        message: "image upload successfully",
        error: false,
        success: true,
        data: user,
    });
};

const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, email, mobile } = req.body;
        const updateUser = await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    name,
                    email,
                    mobile,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            message: "update sucessfully",
            error: false,
            success: true,
            data: { updateUser },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        if (!oldpassword || !newpassword) {
            return res.status(500).json({
                message: "provide the password",
                error: true,
                success: false,
            });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }
        const checkPassword = await bcrypt.compare(oldpassword, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "password is wrong",
                error: true,
                success: false,
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashPassword;
        await user.save();

        return res.status(200).json({
            message: "Password update successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400)
                .json({
                    message: "User not found",
                    success: false,
                    error: true,
                });
        }

        const otp = generateOTP();
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); //1hr
        const update = await User.findByIdAndUpdate(user._id,
            {
                $set: {
                    forgetPasswordOtp: otp,
                    forgetPasswordExpiry: new Date(expireTime).toLocaleString(),
                },
            },
            { new: true }
        );
        await sendEmail({
            sendTo: email,
            subject: "Forgot password from Binkeyit",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp,
            }),
        });
        return res.json({
            message: "check your email",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide email and OTP.",
                error: true,
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false,
            });
        }

        const currentTime = new Date().toLocaleString();

        if (user.forgetPasswordExpiry < currentTime) {
            const updateUser = await User.findByIdAndUpdate(user?._id, {
                forgetPasswordOtp: "",
                forgetPasswordExpiry: "",
            });
            return res.status(400).json({
                message: "OTP has been expired",
                error: true,
                success: false,
            });
        }

        if (otp !== user.forgetPasswordOtp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false,
            });
        }

        //if otp is not expired
        //otp === user.forgetPasswordOtp

        const updateUser = await User.findByIdAndUpdate(user?._id, {
            forgetPasswordOtp: "",
            forgetPasswordExpiry: "",
        });

        return res.status(200).json({
            message: "OTP verify successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const resetpassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message:"provide required fields email, newPassword, confirmPassword",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email is not available",
                error: true,
                success: false,
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "newPassword and confirmPassword not match.",
                error: true,
                success: false,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const update = await User.findOneAndUpdate(user._id, {
            password: hashPassword,
        });

        return res.status(200).json({
            message: "Password updated successfully.",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false,
            });
        }

        const verifyToken = await jwt.verify( refreshToken,process.env.REFRESH_TOKEN_SECRET);

        if (!verifyToken) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false,
            });
        }

        const userId = verifyToken?._id;

        const newAccessToken = await generateAccessToken(userId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        res.cookie("accessToken", newAccessToken, cookiesOption);

        return res.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");

        return res.json({
            message: "User details",
            error: false,
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false,
        });
    }
};

export {
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
    userDetails,
};
