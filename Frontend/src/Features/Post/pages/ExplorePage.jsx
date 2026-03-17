import { useEffect, useState, useRef } from "react";
import { getExplorePosts } from "../services/post.api";
import { likePost, unlikePost, savePost, unsavePost } from "../services/post.api";

const timeAgo = (d) => {
    if (!d) return "";
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`;
    return `${Math.floor(s / 86400)}d`;
};

const ExplorePostModal = ({ post, onClose }) => {
    const [liked, setLiked] = useState(post.isLiked);
    const [saved, setSaved] = useState(post.isSaved);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const debounce = useRef(null);
    const saveDebounce = useRef(null);
    const syncedLike = useRef(post.isLiked);
    const syncedSave = useRef(post.isSaved);

    const toggleLike = () => {
        const next = !liked;
        setLiked(next);
        setLikesCount(c => next ? c + 1 : Math.max(c - 1, 0));
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            if (next === syncedLike.current) return;
            next ? likePost(post._id).catch(() => {}) : unlikePost(post._id).catch(() => {});
            syncedLike.current = next;
        }, 600);
    };

    const toggleSave = () => {
        const next = !saved;
        setSaved(next);
        clearTimeout(saveDebounce.current);
        saveDebounce.current = setTimeout(() => {
            if (next === syncedSave.current) return;
            next ? savePost(post._id).catch(() => {}) : unsavePost(post._id).catch(() => {});
            syncedSave.current = next;
        }, 600);
    };

    const username = post.user?.username || "Unknown";
    const avatar = post.user?.profilePicture || `https://i.pravatar.cc/150?u=${username}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "88vh" }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 text-white/60 hover:text-white bg-black/40 rounded-full p-1 border-none cursor-pointer transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <div className="md:w-3/5 bg-black flex items-center justify-center" style={{ minHeight: "300px" }}>
                    <img src={post.imgURL} alt="post" className="w-full h-full object-contain max-h-[70vh]" />
                </div>

                {/* Info panel */}
                <div className="md:w-2/5 flex flex-col border-l border-white/8">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
                        <div className="ig-ring" style={{ padding: "2px", borderRadius: "50%" }}>
                            <img src={avatar} alt={username} className="w-9 h-9 rounded-full object-cover block" style={{ border: "2px solid #1a1a1a" }} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{username}</p>
                            <p className="text-xs text-white/35">{timeAgo(post.createdAt)}</p>
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="flex-1 overflow-y-auto px-4 py-3">
                        {post.caption && (
                            <p className="text-sm text-white/80 leading-relaxed">
                                <span className="font-semibold text-white mr-2">{username}</span>
                                {post.caption}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="border-t border-white/8 px-4 py-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex gap-4">
                                <button onClick={toggleLike} className="bg-transparent border-none cursor-pointer p-0 hover:opacity-70 transition-opacity">
                                    <svg className="w-6 h-6" fill={liked ? "#ef4444" : "none"} viewBox="0 0 24 24" stroke={liked ? "#ef4444" : "white"} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                                <button className="bg-transparent border-none cursor-pointer p-0 text-white hover:opacity-70 transition-opacity">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                </button>
                            </div>
                            <button onClick={toggleSave} className="bg-transparent border-none cursor-pointer p-0 hover:opacity-70 transition-opacity" style={{ color: saved ? "#f09433" : "white" }}>
                                <svg className="w-6 h-6" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm font-semibold text-white">
                            {likesCount === 0 ? "Be the first to like" : `${likesCount.toLocaleString()} ${likesCount === 1 ? "like" : "likes"}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExplorePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getExplorePosts()
            .then(d => setPosts(d.posts || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full px-2 py-4">
                <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="skeleton aspect-square" />
                    ))}
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <svg className="w-8 h-8 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
                <p className="text-white/40 text-sm">Nothing to explore yet.</p>
            </div>
        );
    }

    return (
        <div className="w-full py-2">
            {/* Header */}
            <div className="px-4 pb-4">
                <h1 className="text-xl font-bold text-white">Explore</h1>
                <p className="text-white/40 text-sm mt-0.5">Discover photos from everyone</p>
            </div>

            {/* Masonry-like grid — Pinterest style with 3 columns */}
            <div className="grid grid-cols-3 gap-0.5">
                {posts.map((post, i) => (
                    <button
                        key={post._id || i}
                        onClick={() => setSelected(post)}
                        className="relative group aspect-square overflow-hidden bg-[#1a1a1a] border-none cursor-pointer p-0 block"
                    >
                        <img
                            src={post.imgURL}
                            alt="explore"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <span className="flex items-center gap-1.5 text-white font-semibold text-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
                                </svg>
                                {post.likesCount || 0}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Post Modal */}
            {selected && <ExplorePostModal post={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default ExplorePage;
