import { Router } from "express";
import { followController, unfollowController } from "../controller/user.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";

const userRouter = Router();

/**
 * @desc Follow a user
 * @route POST /api/users/:username/follow [protected]
 * @access Private
 * @description Follow a user
 */
userRouter.post("/:username/follow", identifyUser, followController);

/**
 * @desc Unfollow a user
 * @route POST /api/users/:username/unfollow [protected]
 * @access Private
 * @description Unfollow a user
 */
userRouter.post("/:username/unfollow", identifyUser, unfollowController);

export default userRouter;