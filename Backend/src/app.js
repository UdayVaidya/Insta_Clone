import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL , 
    credentials: true,              
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/**
 * @desc Authorization routes
 * @route /api/auth
 * @access Public
 */
app.use("/api/auth", authRouter);

/**
 * @desc Post routes
 * @route /api/posts
 * @access Private
 */
app.use("/api/posts", postRouter);

/**
 * @desc User routes
 * @route /api/users
 * @access Private
 */
app.use("/api/users", userRouter);


/**
 * Health check
 */
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is Healthy", timestamp: new Date().toISOString() });
});

export default app;