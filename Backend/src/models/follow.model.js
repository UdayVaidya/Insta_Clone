import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        ref: "User",
        required:[true, "follower is required"]
    },
    followee: {
        type: String,
        ref: "User",
        required:[true, "followee is required"]
    },
    status:{
        type: String,
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        },
        default: "pending"
    }

},{timestamps: true});

followSchema.index({follower: 1, followee: 1}, {unique: true});

const followModel = mongoose.model("Follow", followSchema);

export default followModel;