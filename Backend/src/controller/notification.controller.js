import followModel from "../models/follow.model.js";
import User from "../models/user.model.js";
import likeModel from "../models/like.model.js";
import postModel from "../models/post.model.js";

/**
 * GET /api/notifications
 * Returns likes on the current user's posts + new followers
 */
const getNotificationsController = async (req, res) => {
    const currentUserId = req.user.id;
    const currentUsername = req.user.username;

    try {
        // 1. My posts
        const myPosts = await postModel.find({ user: currentUserId }).lean();
        const myPostIds = myPosts.map(p => p._id);

        // 2. Likes on my posts
        const likes = await likeModel
            .find({ post: { $in: myPostIds } })
            .sort({ createdAt: -1 })
            .limit(30)
            .lean();

        const likeNotifications = await Promise.all(likes.map(async (like) => {
            const fromUser = await User.findOne({ username: like.user }).select("username profilePicture").lean();
            const post = myPosts.find(p => p._id.toString() === like.post.toString());
            return {
                type: "like",
                from: fromUser,
                post: { _id: post?._id, imgURL: post?.imgURL },
                createdAt: like.createdAt,
                text: "liked your photo."
            };
        }));

        // 3. New followers
        const follows = await followModel
            .find({ followee: currentUserId, status: "accepted" })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate("follower", "username profilePicture")
            .lean();

        const followNotifications = follows.map(f => ({
            type: "follow",
            from: f.follower,
            createdAt: f.createdAt,
            text: "started following you."
        }));

        // 4. Merge + sort by date
        const all = [...likeNotifications, ...followNotifications]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 40);

        return res.status(200).json({ success: true, notifications: all });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { getNotificationsController };
