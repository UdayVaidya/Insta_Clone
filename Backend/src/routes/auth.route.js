import { Router } from "express";
import { registerUserController, loginUserController, getMeController, logoutController } from "../controller/auth.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", identifyUser, getMeController);

export default authRouter;