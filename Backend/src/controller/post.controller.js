import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import likeModel from "../models/like.model.js";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const createPostController = async (req, res) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Token not provided, Unauthorized access" })
    }


    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token, Unauthorized access" })
    }



    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded. Please upload an image." })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName: req.file.originalname,
        folder: "Insta-Clone-Posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgURL: file.url,
        user: decoded.id
    })

    return res.status(201).json({ message: "Post created successfully", post })
};

const getPostsController = async (req, res) => {
    const userId = req.user.id;
    const posts = await postModel.find({ user: userId });
    return res.status(200).json({ message: "Posts fetched successfully", posts })
};

const getPostDetailsController = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId) {
        return res.status(401).json({ message: "Forbidden content" });
    }
    return res.status(200).json({ message: "Post fetched successfully", post })
};

const likePostController = async (req, res) => {
    const username = req.user.username;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await likeModel.findOne({ post: postId, user: username });

    if (existingLike) {
        return res.status(409).json({ message: "Post already liked" });
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    });
    return res.status(201).json({ message: "Post liked successfully", like })
};

const unlikePostController = async (req, res) => {
    const username = req.user.username;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await likeModel.findOne({ post: postId, user: username });

    if (!existingLike) {
        return res.status(409).json({ message: "Post not liked" });
    }

    const like = await likeModel.deleteOne({ post: postId, user: username });

    return res.status(201).json({ message: "Post unliked successfully", like })
};


const getFeedController = async (req, res) => {

    const user = req.user;
    const posts = await Promise.all((await postModel.find().populate("user").lean())
        .map(async (post) => {

            /**
            * typeof post => object
            */

            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            });

            post.isLiked = Boolean(isLiked);
            return post;
        }))

    return res.status(200).json({ message: "Posts fetched successfully", posts })
};


export { createPostController, getPostsController, getPostDetailsController, likePostController, getFeedController, unlikePostController };
