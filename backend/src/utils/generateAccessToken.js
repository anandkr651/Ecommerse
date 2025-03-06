import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
    const token = await jwt.sign(
        { _id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    return token;
};

export default generateAccessToken;
