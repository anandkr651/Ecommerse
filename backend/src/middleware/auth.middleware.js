import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(500).json({
                message: "provide Token",
                success: false,
                error: true,
            });
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        // console.log("decodedToken",decodedToken);
        if(!decodedToken){
            return res.status(500).json({
                message: "token was expire",
                success: false,
                error: true,
            });
        }        
        req.user=decodedToken
        next();
    } catch (error) {
        return res.status(500).json({
            message: "invalid access token",
            success: false,
            error: true,
        });
    }
};
export default verifyJWT;
