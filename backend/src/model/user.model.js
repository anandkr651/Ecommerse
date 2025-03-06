import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            default: "",
        },
        mobile: {
            type: Number,
            default: null,
        },
        refreshToken: {
            type: String,
            default: "",
        },
        verifyEmail: {
            type: Boolean,
            default: false,
        },
        lastLoginDate: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["Active", "Inactive", "Suspended"],
            default: "Active",
        },
        forgetPasswordOtp: {
            type: String,
            default: null,
        },
        forgetPasswordExpiry: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User",
        },
        addressDetail: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Address",
            },
        ],
        shoppingCart: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "CartProduct",
            },
        ],
        orderHistory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Order",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
