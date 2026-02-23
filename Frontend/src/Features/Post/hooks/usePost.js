import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { getFeed } from "../services/post.api";

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

    return { loading, feed, post, handleGetFeed };
};