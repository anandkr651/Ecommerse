// import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
// app.use(morgan());
app.use(helmet(
    {crossOriginResourcePolicy : false
}));

import userRoute from "./routes/user.routes.js";
app.use("/api/v1/users",userRoute)

export default app;
