import { Router } from "express";
import { followController, unfollowController, getUserProfileController, getSuggestedUsersController } from "../controller/user.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/suggested", identifyUser, getSuggestedUsersController);
userRouter.get("/:username", identifyUser, getUserProfileController);
userRouter.post("/:username/follow", identifyUser, followController);
userRouter.post("/:username/unfollow", identifyUser, unfollowController);

export default userRouter;