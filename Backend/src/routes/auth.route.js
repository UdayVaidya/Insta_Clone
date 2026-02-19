import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";


const authRouter = Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
authRouter.post("/register", registerUser);

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post("/login", loginUser);


export default authRouter;