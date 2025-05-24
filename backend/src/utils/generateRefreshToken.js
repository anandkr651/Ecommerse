import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const generateRefreshToken = async (userId) => {
    const token = await jwt.sign(
        { _id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
    const updateRefreshToken = await User.updateOne({ _id: userId },
        { refreshToken: token }
    );
    return token;
};

export default generateRefreshToken;
