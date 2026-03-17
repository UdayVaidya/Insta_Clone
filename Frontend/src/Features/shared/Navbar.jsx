import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../Post/components/CreatePostModal";

const Navbar = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const onLogout = async () => {
        setShowProfileMenu(false);
        await handleLogout();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <header
                className="sticky top-0 z-40 w-full flex justify-center border-b border-white/5"
                style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)" }}
            >
                <div className="w-full max-w-5xl px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <span
                        className="text-xl font-bold tracking-tight select-none cursor-pointer"
                        style={{
                            background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                        onClick={() => navigate("/feed")}
                    >
                        Lumio
                    </span>

                    {/* Center search bar */}
                    <div
                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl flex-1 max-w-xs mx-8"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        <svg className="w-4 h-4 text-white/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-sm text-white/70 placeholder:text-white/25 outline-none flex-1 w-full"
                        />
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-2">
                        {/* Create post button */}
                        <button
                            onClick={() => setShowCreatePost(true)}
                            id="create-post-btn"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-95 border-none"
                            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className="hidden sm:inline">New Post</span>
                        </button>

                        {/* Profile avatar + dropdown */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowProfileMenu(prev => !prev)}
                                className="bg-transparent border-none cursor-pointer p-0"
                                id="profile-menu-btn"
                            >
                                <div className="ig-ring" style={{ padding: "2px", borderRadius: "50%" }}>
                                    <img
                                        src={user?.profilePicture || `https://i.pravatar.cc/150?u=${user?.username}`}
                                        alt={user?.username}
                                        className="w-8 h-8 rounded-full object-cover block"
                                        style={{ border: "2px solid #0a0a0a" }}
                                        onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${user?.username}`; }}
                                    />
                                </div>
                            </button>

                            {/* Dropdown */}
                            {showProfileMenu && (
                                <div
                                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl z-50"
                                    style={{ background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)" }}
                                >
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-white/8">
                                        <p className="text-white text-sm font-semibold">{user?.username}</p>
                                        <p className="text-white/40 text-xs mt-0.5 truncate">{user?.email}</p>
                                    </div>

                                    <div className="py-1">
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/6 transition-colors cursor-pointer bg-transparent border-none text-left"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            Profile
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/6 transition-colors cursor-pointer bg-transparent border-none text-left"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>
                                            Saved posts
                                        </button>
                                    </div>

                                    <div className="border-t border-white/8 py-1">
                                        <button
                                            onClick={onLogout}
                                            id="logout-btn"
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer bg-transparent border-none text-left"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                            </svg>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Create Post Modal */}
            {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} />}
        </>
    );
};

export default Navbar;