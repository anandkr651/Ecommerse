import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const generateAccessToken = async (userId) => {
    const token = await jwt.sign(
        { _id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    const updateAccessToken = await User.updateOne({ _id: userId },
        { accessToken: token }
    );
    return token;
};

export default generateAccessToken;
