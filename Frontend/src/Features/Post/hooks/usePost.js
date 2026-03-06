import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed, likePost, unlikePost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);
    const { post, setPost, loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const response = await getFeed();
            console.log("API response:", response);
            setFeed(response.posts);
        } catch (error) {
            console.error("Feed fetch failed:", error.response?.data || error.message);
        }
        setLoading(false);
    };

    const handleLikePost = async (postId) => {
        // Optimistic update: flip isLiked in feed state immediately
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: true } : p));
        try {
            await likePost(postId);
        } catch (error) {
            // Revert on failure
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: false } : p));
            console.error("Like failed:", error.response?.data || error.message);
        }
    };

    const handleUnlikePost = async (postId) => {
        // Optimistic update: flip isLiked in feed state immediately
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: false } : p));
        try {
            await unlikePost(postId);
        } catch (error) {
            // Revert on failure
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: true } : p));
            console.error("Unlike failed:", error.response?.data || error.message);
        }
    };


    return { loading, feed, post, handleGetFeed, handleLikePost, handleUnlikePost, };
};