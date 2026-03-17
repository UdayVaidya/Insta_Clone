import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import likeModel from "../models/like.model.js";
import saveModel from "../models/save.model.js";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const createPostController = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token not provided, Unauthorized access" });

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return res.status(401).json({ message: "Invalid token, Unauthorized access" });
    }

    if (!req.file) return res.status(400).json({ message: "No file uploaded. Please upload an image." });

    try {
        const file = await imagekit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
            fileName: req.file.originalname,
            folder: "Insta-Clone-Posts"
        });
        const post = await postModel.create({ caption: req.body.caption, imgURL: file.url, user: decoded.id });
        const populatedPost = await postModel.findById(post._id).populate("user").lean();
        return res.status(201).json({ message: "Post created successfully", post: populatedPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPostsController = async (req, res) => {
    try {
        const posts = await postModel.find({ user: req.user.id }).populate("user").lean();
        return res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPostDetailsController = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.postId).populate("user").lean();
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (post.user._id.toString() !== req.user.id) return res.status(401).json({ message: "Forbidden content" });
        return res.status(200).json({ message: "Post fetched successfully", post });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const likePostController = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        const existingLike = await likeModel.findOne({ post: postId, user: username });
        if (existingLike) return res.status(409).json({ message: "Post already liked" });
        const like = await likeModel.create({ post: postId, user: username });
        return res.status(201).json({ message: "Post liked successfully", like });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const unlikePostController = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        const existingLike = await likeModel.findOne({ post: postId, user: username });
        if (!existingLike) return res.status(409).json({ message: "Post not liked" });
        await likeModel.deleteOne({ post: postId, user: username });
        return res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const savePostController = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    try {
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        const existingSave = await saveModel.findOne({ post: postId, user: username });
        if (existingSave) return res.status(409).json({ message: "Post already saved" });
        const save = await saveModel.create({ post: postId, user: username });
        return res.status(201).json({ message: "Post saved successfully", save });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const unsavePostController = async (req, res) => {
    const { username } = req.user;
    const { postId } = req.params;
    try {
        const existingSave = await saveModel.findOne({ post: postId, user: username });
        if (!existingSave) return res.status(409).json({ message: "Post not saved" });
        await saveModel.deleteOne({ post: postId, user: username });
        return res.status(200).json({ message: "Post unsaved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSavedPostsController = async (req, res) => {
    const { username } = req.user;
    try {
        const saves = await saveModel.find({ user: username }).lean();
        const postIds = saves.map(s => s.post);
        const posts = await postModel.find({ _id: { $in: postIds } }).populate("user").lean();

        // Enrich with like status
        const enriched = await Promise.all(posts.map(async (post) => {
            const isLiked = await likeModel.findOne({ user: username, post: post._id });
            const likesCount = await likeModel.countDocuments({ post: post._id });
            return { ...post, isLiked: Boolean(isLiked), isSaved: true, likesCount };
        }));

        return res.status(200).json({ message: "Saved posts fetched", posts: enriched });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getExplorePostsController = async (req, res) => {
    const { username } = req.user;
    try {
        // Return all posts sorted by newest, enriched with like/save
        const rawPosts = await postModel.find().sort({ createdAt: -1 }).limit(60).populate("user").lean();
        const enriched = await Promise.all(rawPosts.map(async (post) => {
            const isLiked = await likeModel.findOne({ user: username, post: post._id });
            const isSaved = await saveModel.findOne({ user: username, post: post._id });
            const likesCount = await likeModel.countDocuments({ post: post._id });
            return { ...post, isLiked: Boolean(isLiked), isSaved: Boolean(isSaved), likesCount };
        }));
        return res.status(200).json({ message: "Explore posts fetched", posts: enriched });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFeedController = async (req, res) => {
    const { username } = req.user;
    try {
        const rawPosts = await postModel.find().sort({ createdAt: -1 }).populate("user").lean();
        const posts = await Promise.all(rawPosts.map(async (post) => {
            const isLiked = await likeModel.findOne({ user: username, post: post._id });
            const isSaved = await saveModel.findOne({ user: username, post: post._id });
            const likesCount = await likeModel.countDocuments({ post: post._id });
            post.isLiked = Boolean(isLiked);
            post.isSaved = Boolean(isSaved);
            post.likesCount = likesCount;
            return post;
        }));
        return res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
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
};
