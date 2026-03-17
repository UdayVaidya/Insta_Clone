import { useEffect, useState } from "react";
import { getSavedPosts, likePost, unlikePost, savePost, unsavePost } from "../services/post.api";

const SavedPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSavedPosts()
            .then(d => setPosts(d.posts || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleUnsave = async (postId) => {
        setPosts(prev => prev.filter(p => p._id !== postId));
        try { await unsavePost(postId); } catch { /* revert if needed */ }
    };

    if (loading) {
        return (
            <div className="w-full px-2 py-4">
                <div className="px-2 mb-4">
                    <div className="skeleton h-5 w-32 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="skeleton aspect-square" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-2">
            {/* Header */}
            <div className="px-4 pb-4">
                <h1 className="text-xl font-bold text-white">Saved</h1>
                <p className="text-white/40 text-sm mt-0.5">
                    {posts.length === 0 ? "Your saved posts will appear here" : `${posts.length} saved ${posts.length === 1 ? "post" : "posts"}`}
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <svg className="w-8 h-8 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white/60 font-semibold">No saved posts yet</p>
                        <p className="text-white/25 text-sm mt-1">Tap the bookmark icon on any post to save it.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-0.5">
                    {posts.map((post, i) => (
                        <div key={post._id || i} className="relative group aspect-square overflow-hidden bg-[#1a1a1a]">
                            <img
                                src={post.imgURL}
                                alt="saved"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Hover overlay with unsave button */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
                                    </svg>
                                    {post.likesCount || 0}
                                </div>
                                <button
                                    onClick={() => handleUnsave(post._id)}
                                    className="text-xs text-white/70 bg-white/15 hover:bg-red-500/60 border-none rounded-lg px-2 py-1 cursor-pointer transition-colors"
                                >
                                    Unsave
                                </button>
                            </div>

                            {/* Small bookmark badge */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedPage;
