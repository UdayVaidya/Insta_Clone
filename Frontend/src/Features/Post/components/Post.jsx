import { useState, useRef } from "react";

const timeAgo = (dateStr) => {
    if (!dateStr) return "Just now";
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
};

const Post = ({ user, post, LikePost, UnlikePost, SavePost, UnsavePost }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [liked, setLiked] = useState(post?.isLiked || false);
    const [likeAnim, setLikeAnim] = useState(false);
    const [saved, setSaved] = useState(post?.isSaved || false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [captionExpanded, setCaptionExpanded] = useState(false);
    const [doubleTapAnim, setDoubleTapAnim] = useState(false);

    const username = (user && user.username) ? user.username : "Unknown User";
    const avatar = (user && user.profilePicture) ? user.profilePicture : `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`;
    const caption = post?.caption || "";
    const isLongCaption = caption.length > 100;

    // Debounce refs
    const debounceTimer = useRef(null);
    const lastSyncedLiked = useRef(post?.isLiked || false);
    const lastSyncedSaved = useRef(post?.isSaved || false);
    const saveDebounceTimer = useRef(null);

    const triggerLikeAnim = () => {
        setLikeAnim(true);
        setTimeout(() => setLikeAnim(false), 400);
    };

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikesCount(c => newLiked ? c + 1 : Math.max(c - 1, 0));
        if (newLiked) triggerLikeAnim();

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            if (newLiked === lastSyncedLiked.current) return;
            newLiked ? LikePost(post._id) : UnlikePost(post._id);
            lastSyncedLiked.current = newLiked;
        }, 600);
    };

    const handleDoubleTap = () => {
        if (!liked) {
            setLiked(true);
            setLikesCount(c => c + 1);
            triggerLikeAnim();
            setDoubleTapAnim(true);
            setTimeout(() => setDoubleTapAnim(false), 800);

            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                if (lastSyncedLiked.current) return;
                LikePost(post._id);
                lastSyncedLiked.current = true;
            }, 600);
        } else {
            setDoubleTapAnim(true);
            setTimeout(() => setDoubleTapAnim(false), 800);
        }
    };

    const handleSave = () => {
        const newSaved = !saved;
        setSaved(newSaved);

        if (saveDebounceTimer.current) clearTimeout(saveDebounceTimer.current);
        saveDebounceTimer.current = setTimeout(() => {
            if (newSaved === lastSyncedSaved.current) return;
            newSaved ? SavePost(post._id) : UnsavePost(post._id);
            lastSyncedSaved.current = newSaved;
        }, 600);
    };

    return (
        <article
            className="w-full flex flex-col post-fade"
            style={{ background: "#171717", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}
        >
            {/* Header */}
            <div className="flex gap-3 items-center px-4 py-3">
                <div className="ig-ring flex-shrink-0" style={{ padding: "2px", borderRadius: "50%" }}>
                    <img
                        src={avatar}
                        alt={username}
                        className="w-9 h-9 rounded-full object-cover block"
                        style={{ border: "2px solid #171717" }}
                        onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=3"; }}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white leading-none">{username}</p>
                    <p className="text-xs text-white/35 mt-0.5">{timeAgo(post?.createdAt)}</p>
                </div>

                <button className="text-white/50 hover:text-white transition-colors p-1 cursor-pointer bg-transparent border-none outline-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                </button>
            </div>

            {/* Image */}
            <div className="relative w-full bg-[#1e1e1e] select-none" style={{ minHeight: "300px" }} onDoubleClick={handleDoubleTap}>
                {!imgLoaded && (
                    <div className="skeleton absolute inset-0" style={{ minHeight: "300px" }} />
                )}
                {post?.imgURL && (
                    <img
                        src={post.imgURL}
                        alt="post"
                        className={`w-full h-auto object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgLoaded(true)}
                    />
                )}
                {/* Double-tap heart pop */}
                {doubleTapAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                            className="w-24 h-24 drop-shadow-2xl heart-pop-overlay"
                            style={{ fill: "#ef4444", opacity: 0.9 }}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-4 pt-3 pb-1 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {/* Like */}
                    <button
                        onClick={handleLike}
                        className={`p-0 bg-transparent border-none outline-none cursor-pointer transition-all duration-200 hover:opacity-70 ${likeAnim ? "heart-pop" : ""}`}
                    >
                        <svg
                            className="w-6 h-6 transition-all duration-200"
                            style={{ color: liked ? "#ef4444" : "white", fill: liked ? "#ef4444" : "none", stroke: liked ? "#ef4444" : "white", strokeWidth: liked ? 0 : 1.5 }}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>

                    {/* Comment */}
                    <button className="p-0 bg-transparent border-none outline-none cursor-pointer text-white hover:opacity-70 transition-opacity">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                    </button>

                    {/* Share */}
                    <button className="p-0 bg-transparent border-none outline-none cursor-pointer text-white hover:opacity-70 transition-opacity">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>

                {/* Save */}
                <button
                    onClick={handleSave}
                    className="p-0 bg-transparent border-none outline-none cursor-pointer hover:opacity-70 transition-all duration-200"
                    style={{ color: saved ? "#f09433" : "white" }}
                >
                    <svg className="w-6 h-6" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                </button>
            </div>

            {/* Like count */}
            <div className="px-4 pb-1">
                <p className="text-sm font-semibold text-white">
                    {likesCount === 0 ? "Be the first to like this" : `${likesCount.toLocaleString()} ${likesCount === 1 ? "like" : "likes"}`}
                </p>
            </div>

            {/* Caption */}
            {caption && (
                <div className="px-4 pb-4 text-sm text-white leading-relaxed">
                    <span className="font-semibold mr-2">{username}</span>
                    <span className="text-white/75 flex flex-col gap-2">
                        {isLongCaption && !captionExpanded ? (
                            <>
                                {caption.slice(0, 100)}…{" "}
                                <button
                                    onClick={() => setCaptionExpanded(true)}
                                    className="text-white/40 text-xs bg-transparent border-none outline-none cursor-pointer hover:text-white/70 transition-colors"
                                >
                                    more
                                </button>
                            </>
                        ) : caption}
                    </span>
                </div>
            )}
        </article>
    );
};

export default Post;