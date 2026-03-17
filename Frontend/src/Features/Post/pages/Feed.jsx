import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import Post from "../components/Post";

const Feed = () => {
    const { feed, loading, handleGetFeed, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col gap-5 py-2 px-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col gap-0 rounded-2xl overflow-hidden" style={{ background: "#171717", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center gap-3 p-4">
                            <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
                            <div className="flex flex-col gap-1.5 flex-1">
                                <div className="skeleton h-3 w-28 rounded" />
                                <div className="skeleton h-2.5 w-16 rounded" />
                            </div>
                        </div>
                        <div className="skeleton w-full" style={{ height: "320px" }} />
                        <div className="p-4 flex flex-col gap-2">
                            <div className="skeleton h-3 w-24 rounded" />
                            <div className="skeleton h-3 w-48 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (feed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <svg className="w-8 h-8 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="text-white/60 font-semibold text-base">No posts yet</p>
                    <p className="text-white/25 text-sm mt-1">Share your first post or follow someone to see their photos here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-5 py-2 px-2">
            {feed.map((item, i) => (
                <Post
                    key={item._id || i}
                    user={item.user}
                    post={item}
                    LikePost={handleLikePost}
                    UnlikePost={handleUnlikePost}
                    SavePost={handleSavePost}
                    UnsavePost={handleUnsavePost}
                />
            ))}
        </div>
    );
};

export default Feed;