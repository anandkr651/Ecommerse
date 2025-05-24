import { CartProduct } from "../model/cartProduct.model.js";
import { User } from "../model/user.model.js";

const createAddToCartItem = async (req, res) => {
    try {
        const userId = req.user;
        const { productId } = req.body;

        if (!productId) {
            return res.status(500).json({
                message: "provide productId",
                error: true,
                success: false,
            });
        }
        const cartItem = new CartProduct({
            quantity: 1,
            userId: userId,
            productId: productId,
        });
        const save = await cartItem.save();

        const updateCartUser = await User.updateOne({ _id: userId },
            {
                $push: {
                    shoppingCart: productId,
                },
            }
        );
        return res.status(200).json({
            data: save,
            message: "Item Added successfully",
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
const getCartItem = async (req, res) => {
    try {
        const userId = req.user;
        const cartItem = await CartProduct.find({userId: userId,}).populate("productId");

        return res.status(200).json({
            data: cartItem,
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
const updateCartItemQty = async (req, res) => {
    try {
        const userId = req.user;
        const { _id, qty } = req.body;
        if (!_id || !qty) {
            return res.status(500).json({
                message: "provide _id , qty",
                error: true,
                success: false,
            });
        }
        const updateCartItem = await CartProduct.updateOne(
            {
                _id: _id,
                userId: userId,
            },
            {
                quantity: qty,
            }
        );
        return res.status(200).json({
            message: "Item update successfully",
            error: false,
            success: true,
            data: updateCartItem,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
const deleteCartItemQty = async (req, res) => {
    try {
        const userId = req.user;
        const { _id } = req.body;
        if (!_id) {
            return res.status(500).json({
                message: "provide _id",
                error: true,
                success: false,
            });
        }
        const deleteCartItem = await CartProduct.deleteOne({
            _id: _id,
            userId: userId,
        });
        return res.status(200).json({
            message: "remove from cart",
            error: false,
            success: true,
            data: deleteCartItem,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};
export {
    createAddToCartItem,
    getCartItem,
    updateCartItemQty,
    deleteCartItemQty,
};
