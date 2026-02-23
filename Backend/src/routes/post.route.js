import { Router } from "express";
import { createPostController, getPostsController, getPostDetailsController, likePostController, getFeedController } from "../controller/post.controller.js";
import multer from "multer";
import identifyUser from "../middlewares/auth.middleware.js";

const postRouter = Router();
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @desc Create post
 * @route POST /api/posts/ [protected]
 * @access Private
 * @description Create post
 */
postRouter.post("/", upload.single("image"), createPostController);

/**
 * @desc Get all posts
 * @route GET /api/posts/ [protected]
 * @access Private
 * @description Get all posts
 */
postRouter.get("/", identifyUser, getPostsController);

/**
 * @desc Get feed
 * @route GET /api/posts/feed [protected]
 * @access Private
 * @description Get feed
 */
postRouter.get("/feed", identifyUser, getFeedController);

/**
 * @desc Get post details
 * @route GET /api/posts/:postId [protected]
 * @access Private
 * @description Get post details
 */
postRouter.get("/:postId", identifyUser, getPostDetailsController);

/**
 * @desc Like post
 * @route POST /api/posts/:postId/like [protected]
 * @access Private
 * @description Like post
 */
postRouter.post("/:postId/like", identifyUser, likePostController);

export default postRouter;
