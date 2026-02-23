import { Router } from "express";
import { registerUserController, loginUserController, getMeController } from "../controller/auth.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @desc Get current logged in user
 * @route POST /api/auth/get-me
 * @access Private
 */
authRouter.post("/get-me", identifyUser, getMeController);


export default authRouter;