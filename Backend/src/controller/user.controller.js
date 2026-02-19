import followModel from "../models/follow.model.js";
import User from "../models/user.model.js";

const followController = async (req, res) => {
    // this follower is coming from auth middleware 
    const followerUsername = req.user.username;
    // this followee is coming from the URL params
    const followeeUsername = req.params.username;

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await User.findOne({username: followeeUsername});
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "Followee not found"
        })
    }

    const isFollowerExists = await User.findOne({username: followerUsername});
    if(!isFollowerExists){
        return res.status(404).json({
            message: "Follower not found"
        })
    }

    const isAlreadyFollowed = await followModel.findOne({
        follower: isFollowerExists._id, 
        followee: isFolloweeExists._id
    });

    if(isAlreadyFollowed){
        return res.status(400).json({
            message: "You are already following this user"
        })
    }

    const follow = new followModel({follower: isFollowerExists._id, followee: isFolloweeExists._id});

    if(isFolloweeExists.isPrivate){
        follow.status = "pending";
    }else{
        follow.status = "accepted";
    }

    await follow.save();

    return res.status(201).json({
        message: "User followed successfully"
    })


}

const unfollowController = async (req, res) => {
    // this follower is coming from auth middleware 
    const followerUsername = req.user.username;
    // this followee is coming from the URL params
    const followeeUsername = req.params.username;

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        })
    }

    const isFolloweeExists = await User.findOne({username: followeeUsername});
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "Followee not found"
        })
    }

    const isFollowerExists = await User.findOne({username: followerUsername});
    if(!isFollowerExists){
        return res.status(404).json({
            message: "Follower not found"
        })
    }

    const isAlreadyFollowed = await followModel.findOne({
        follower: isFollowerExists._id, 
        followee: isFolloweeExists._id
    })
    if(!isAlreadyFollowed){
        return res.status(400).json({
            message: "You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isAlreadyFollowed._id);

    return res.status(200).json({
        message: "User unfollowed successfully"
    })


}

export {followController, unfollowController};