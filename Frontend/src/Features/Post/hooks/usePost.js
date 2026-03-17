import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed, likePost, unlikePost, savePost, unsavePost, createPost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);
    const { post, setPost, loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const response = await getFeed();
            setFeed(response.posts);
        } catch (error) {
            console.error("Feed fetch failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (formData) => {
        try {
            const response = await createPost(formData);
            // Prepend the new post to the top of the feed
            setFeed(prev => [{ ...response.post, isLiked: false, isSaved: false }, ...prev]);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleLikePost = async (postId) => {
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: true, likesCount: (p.likesCount || 0) + 1 } : p));
        try {
            await likePost(postId);
        } catch (error) {
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: false, likesCount: Math.max((p.likesCount || 1) - 1, 0) } : p));
            console.error("Like failed:", error.response?.data || error.message);
        }
    };

    const handleUnlikePost = async (postId) => {
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: false, likesCount: Math.max((p.likesCount || 1) - 1, 0) } : p));
        try {
            await unlikePost(postId);
        } catch (error) {
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isLiked: true, likesCount: (p.likesCount || 0) + 1 } : p));
            console.error("Unlike failed:", error.response?.data || error.message);
        }
    };

    const handleSavePost = async (postId) => {
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isSaved: true } : p));
        try {
            await savePost(postId);
        } catch (error) {
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isSaved: false } : p));
            console.error("Save failed:", error.response?.data || error.message);
        }
    };

    const handleUnsavePost = async (postId) => {
        setFeed(prev => prev.map(p => p._id === postId ? { ...p, isSaved: false } : p));
        try {
            await unsavePost(postId);
        } catch (error) {
            setFeed(prev => prev.map(p => p._id === postId ? { ...p, isSaved: true } : p));
            console.error("Unsave failed:", error.response?.data || error.message);
        }
    };

    return {
        loading, feed, post,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleUnlikePost,
        handleSavePost,
        handleUnsavePost,
    };
};