import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";
import Navbar from "../../shared/Navbar";

const Feed = () => {
    const { feed, loading, handleGetFeed, handleLikePost, handleUnlikePost } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    const setLike = (postId) => {
        handleLikePost(postId);
    };

    const unlikePost = (postId) => {
        handleUnlikePost(postId);
    };

    // Loading skeleton
    if (loading || !feed) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
                <Navbar />
                <div className="flex justify-center pt-8">
                    <div className="w-full max-w-[470px] px-4 flex flex-col gap-5">
                        {[1, 2].map(i => (
                            <div key={i} className="skeleton rounded-2xl h-[480px] w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (feed.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
                <div className="flex flex-col items-center justify-center flex-1 gap-3">
                    <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 15.61L19.59 17l-2.54-2.56L15 16.5V21h-2v-4.5l-7.5 7.5L4 22.5l18-18-1 1.11zM8 3v4.39l-4-4L2.5 4.91 5 7.39V10H3V3h5zm8 0h4v4h-2V5h-2V3z" />
                    </svg>
                    <p className="text-white/50 font-medium">No posts yet</p>
                    <p className="text-white/25 text-sm">Check back soon or follow more people</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">

            <main className="flex justify-center flex-1 py-2">
                <div className="w-full max-w-[470px] px-2 flex flex-col gap-5">
                    {feed.map((item, i) => (
                        <Post
                            key={item._id || i}
                            user={item.user}
                            post={item}
                            LikePost={setLike}
                            UnlikePost={unlikePost}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Feed;