import { Router } from "express";
import {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController,
    getFeedController,
    unlikePostController,
    savePostController,
    unsavePostController,
    getSavedPostsController,
    getExplorePostsController,
} from "../controller/post.controller.js";
import multer from "multer";
import identifyUser from "../middlewares/auth.middleware.js";

const postRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("image"), createPostController);
postRouter.get("/feed", identifyUser, getFeedController);
postRouter.get("/saved", identifyUser, getSavedPostsController);
postRouter.get("/explore", identifyUser, getExplorePostsController);
postRouter.get("/", identifyUser, getPostsController);
postRouter.get("/:postId", identifyUser, getPostDetailsController);
postRouter.post("/:postId/like", identifyUser, likePostController);
postRouter.post("/:postId/unlike", identifyUser, unlikePostController);
postRouter.post("/:postId/save", identifyUser, savePostController);
postRouter.post("/:postId/unsave", identifyUser, unsavePostController);

export default postRouter;
