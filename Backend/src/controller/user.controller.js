import followModel from "../models/follow.model.js";
import User from "../models/user.model.js";
import postModel from "../models/post.model.js";
import likeModel from "../models/like.model.js";

const getUserProfileController = async (req, res) => {
    const { username } = req.params;
    const currentUserId = req.user.id;

    try {
        const profileUser = await User.findOne({ username });
        if (!profileUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await postModel.find({ user: profileUser._id }).lean();

        // Get follower/following counts
        const followersCount = await followModel.countDocuments({ followee: profileUser._id, status: "accepted" });
        const followingCount = await followModel.countDocuments({ follower: profileUser._id, status: "accepted" });

        // Check if the current user follows this profile
        const currentUser = await User.findById(currentUserId);
        const isFollowing = await followModel.findOne({
            follower: currentUser._id,
            followee: profileUser._id,
            status: "accepted"
        });

        return res.status(200).json({
            success: true,
            user: {
                username: profileUser.username,
                email: profileUser.email,
                profilePicture: profileUser.profilePicture,
                bio: profileUser.bio,
                isPrivate: profileUser.isPrivate,
                followersCount,
                followingCount,
                postsCount: posts.length,
                isFollowing: Boolean(isFollowing)
            },
            posts
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const followController = async (req, res) => {
    // this follower is coming from auth middleware 
    const followerUsername = req.user.username;
    // this followee is coming from the URL params
    const followeeUsername = req.params.username;

    if (followeeUsername == followerUsername) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    try {
        const isFolloweeExists = await User.findOne({ username: followeeUsername });
        if (!isFolloweeExists) {
            return res.status(404).json({ message: "Followee not found" });
        }

        const isFollowerExists = await User.findOne({ username: followerUsername });
        if (!isFollowerExists) {
            return res.status(404).json({ message: "Follower not found" });
        }

        const isAlreadyFollowed = await followModel.findOne({
            follower: isFollowerExists._id,
            followee: isFolloweeExists._id
        });

        if (isAlreadyFollowed) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        const follow = new followModel({ follower: isFollowerExists._id, followee: isFolloweeExists._id });

        if (isFolloweeExists.isPrivate) {
            follow.status = "pending";
        } else {
            follow.status = "accepted";
        }

        await follow.save();

        return res.status(201).json({ message: "User followed successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const unfollowController = async (req, res) => {
    // this follower is coming from auth middleware 
    const followerUsername = req.user.username;
    // this followee is coming from the URL params
    const followeeUsername = req.params.username;

    if (followeeUsername == followerUsername) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    try {
        const isFolloweeExists = await User.findOne({ username: followeeUsername });
        if (!isFolloweeExists) {
            return res.status(404).json({ message: "Followee not found" });
        }

        const isFollowerExists = await User.findOne({ username: followerUsername });
        if (!isFollowerExists) {
            return res.status(404).json({ message: "Follower not found" });
        }

        const isAlreadyFollowed = await followModel.findOne({
            follower: isFollowerExists._id,
            followee: isFolloweeExists._id
        });
        if (!isAlreadyFollowed) {
            return res.status(400).json({ message: "You are not following this user" });
        }

        await followModel.findByIdAndDelete(isAlreadyFollowed._id);

        return res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSuggestedUsersController = async (req, res) => {
    const currentUserId = req.user.id;
    try {
        // Get all users the current user already follows
        const following = await followModel.find({ follower: currentUserId }).select("followee");
        const followingIds = following.map(f => f.followee.toString());
        followingIds.push(currentUserId); // exclude self

        // Get random users not already followed, limit 5
        const suggestedUsers = await User.find({ _id: { $nin: followingIds } }).limit(5).select("username profilePicture bio");

        return res.status(200).json({ success: true, users: suggestedUsers });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { followController, unfollowController, getUserProfileController, getSuggestedUsersController };