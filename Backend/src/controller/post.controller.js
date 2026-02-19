import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const createPostController = async (req, res) => {
    console.log(req.body, req.file)

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
}

const getPostDetailsController = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    const post = await postModel.findById(postId);
    if(!post){
        return res.status(404).json({message: "Post not found"});
    }

    if(post.user.toString() !== userId){
        return res.status(401).json({message: "Forbidden content"});
    }
    return res.status(200).json({ message: "Post fetched successfully", post })
}

export { createPostController, getPostsController, getPostDetailsController };
