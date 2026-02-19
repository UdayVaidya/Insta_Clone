import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        required: [true, "ImageURL is required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required to create a post"]
    }
}, { timestamps: true });

const postModel = mongoose.model("posts", postSchema);

export default postModel;