import mongoose from "mongoose";
import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";
import { CartProduct } from "../model/cartProduct.model.js";

const CashOnDelivery = async (req, res) => {
    try {
        const userId = req.user;
        const { listItem, deliveryAddressId, subTotal, totalAmt } = req.body;
        console.log(listItem);
        
        const payload = listItem.map((el) => {
            return {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                productDetail: {
                    name: el.productId.name,
                    image: el.productId.image,
                },
                paymentId: "",
                paymentStatus: "CASH ON DELIVERY",
                deliveryAddress: deliveryAddressId,
                subTotal: subTotal,
                totalAmt: totalAmt,
            };
        });
        const generateOrder = await Order.insertMany(payload);
        // remove from the cart
        const removeCartItem = await CartProduct.deleteMany({ userId: userId });
        const updateUser = await User.updateOne(
            { _id: userId },
            { shoppingCart: [] }
        );

        return res.status(200).json({
            message: "Order Successfully",
            error: false,
            success: true,
            data: generateOrder,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
export { CashOnDelivery};
