import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        orderId: {
            type: String,
            require: [true, "Provide orderID"],
            unique: true,
        },
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
        },
        productDetail: {
            name: String,
            image: Array,
        },
        paymentId: {
            type: String,
            default: "",
        },
        paymentStatus: {
            type: String,
            deafult: "",
        },
        deliveryAddress: {
            type: mongoose.Schema.ObjectId,
            ref: "Address",
        },
        subTotal: {
            type: Number,
            default: 0,
        },
        totalAmt: {
            type: Number,
            default: 0,
        },
        invoiceReceipt: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);
export const Order = mongoose.model("Order", orderSchema);
