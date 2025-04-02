// import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
// app.use(morgan());
app.use(helmet({ crossOriginResourcePolicy: false }));

import userRoute from "./routes/user.routes.js";
app.use("/api/v1/users", userRoute);

import categoryRoute from "./routes/category.routes.js";
app.use("/api/v1/category", categoryRoute);

import uploadImageRoute from "./routes/uploadImage.routes.js";
app.use("/api/v1/uploadImage", uploadImageRoute);

import subCategoryRoute from "./routes/subCategory.routes.js";
app.use("/api/v1/subCategory", subCategoryRoute);

import productRoute from "./routes/product.routes.js";
app.use("/api/v1/product", productRoute);

import cartProductRoute from "./routes/cartProduct.routes.js";
app.use("/api/v1/cartProduct", cartProductRoute);

import addressRoute from "./routes/address.routes.js";
app.use("/api/v1/address", addressRoute);

import orderRoute from "./routes/order.routes.js";
app.use("/api/v1/order", orderRoute);

export default app;
