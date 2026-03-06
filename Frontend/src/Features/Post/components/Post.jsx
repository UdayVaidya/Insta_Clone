import { useState, useRef } from "react";


const Post = ({ user, post, LikePost, UnlikePost }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [liked, setLiked] = useState(post?.isLiked || false);
    const [likeAnim, setLikeAnim] = useState(false);
    const [saved, setSaved] = useState(false);
    const [captionExpanded, setCaptionExpanded] = useState(false);

    const username = (user && user.username) ? user.username : "Unknown User";
    const avatar = (user && user.profilePicture) ? user.profilePicture : "https://i.pravatar.cc/150?img=3";
    const caption = post?.caption || "";
    const isLongCaption = caption.length > 80;

    // Debounce: we track the pending final state and only fire after 600ms of no clicks
    const debounceTimer = useRef(null);
    const lastSyncedLiked = useRef(post?.isLiked || false); // what the DB currently knows

    const handleLike = () => {
        const newLiked = !liked;

        // 1. Optimistic UI — instant feedback
        setLiked(newLiked);
        if (newLiked) {
            setLikeAnim(true);
            setTimeout(() => setLikeAnim(false), 400);
        }

        // 2. Debounce — cancel previous pending call and schedule a new one
        if (debounceTimer.current) 
            clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            // Only call API if the state actually changed from what DB knows
            if (newLiked === lastSyncedLiked.current) return;

            if (newLiked) {
                LikePost(post._id);
            } else {
                UnlikePost(post._id);
            }
            lastSyncedLiked.current = newLiked;
        }, 600);
    };


    return (
        <article className="w-full flex flex-col post-fade" style={{ background: '#171717', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>

            {/* Header */}
            <div className="flex gap-3 items-center px-4 py-3">
                {/* Avatar with gradient ring */}
                <div className="ig-ring flex-shrink-0" style={{ padding: '2px', borderRadius: '50%' }}>
                    <img
                        src={avatar}
                        alt={username}
                        className="w-9 h-9 rounded-full object-cover block"
                        style={{ border: '2px solid #171717' }}
                        onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=3" }}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white leading-none">{username}</p>
                    <p className="text-xs text-white/35 mt-0.5">Just now</p>
                </div>

                {/* Options menu */}
                <button className="text-white/50 hover:text-white transition-colors p-1 cursor-pointer bg-transparent border-none outline-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                </button>
            </div>

            {/* Image */}
            <div className="relative w-full bg-[#1e1e1e]" style={{ minHeight: '300px' }}>
                {!imgLoaded && (
                    <div className="skeleton absolute inset-0" style={{ minHeight: '300px' }} />
                )}
                {post?.imgURL && (
                    <img
                        src={post.imgURL}
                        alt="post"
                        className={`w-full h-auto object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgLoaded(true)}
                    />
                )}
            </div>

            {/* Actions */}
            <div className="px-4 pt-3 pb-1 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {/* Like button */}
                    <button
                        onClick={handleLike}
                        className={`p-0 bg-transparent border-none outline-none cursor-pointer transition-all duration-200 hover:opacity-70 ${likeAnim ? 'heart-pop' : ''}`}
                    >
                        <svg
                            className="w-6 h-6 transition-all duration-200"
                            style={{ color: liked ? '#ef4444' : 'white', fill: liked ? '#ef4444' : 'currentColor' }}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        >
                            <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z" />
                        </svg>
                    </button>

                    {/* Comment button */}
                    <button className="p-0 bg-transparent border-none outline-none cursor-pointer text-white hover:opacity-70 transition-opacity">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
                        </svg>
                    </button>

                    {/* Share button */}
                    <button className="p-0 bg-transparent border-none outline-none cursor-pointer text-white hover:opacity-70 transition-opacity">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z" />
                        </svg>
                    </button>
                </div>

                {/* Save button */}
                <button
                    onClick={() => setSaved(prev => !prev)}
                    className="p-0 bg-transparent border-none outline-none cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: saved ? '#f09433' : 'white' }}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z" />
                    </svg>
                </button>
            </div>

            {/* Like count */}
            <div className="px-4 pb-1">
                <p className="text-sm font-semibold text-white">{liked ? "1 like" : "0 likes"}</p>
            </div>

            {/* Caption */}
            {caption && (
                <div className="px-4 pb-4 text-sm text-white leading-relaxed">
                    <span className="font-semibold mr-2">{username}</span>
                    <span className="text-white/80">
                        {isLongCaption && !captionExpanded ? (
                            <>
                                {caption.slice(0, 80)}…{" "}
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
}

export default Post;