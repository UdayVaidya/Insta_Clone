import { useState, useEffect } from "react";
import { getSuggestedUsers, followUser } from "../auth/services/user.api";
import { useAuth } from "../auth/hooks/useAuth";

const SuggestedUser = ({ user: suggestedUser, onFollowed }) => {
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        if (following || loading) return;
        setLoading(true);
        try {
            await followUser(suggestedUser.username);
            setFollowing(true);
            onFollowed && onFollowed(suggestedUser.username);
        } catch {
            // ignore
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="ig-ring flex-shrink-0" style={{ padding: "2px", borderRadius: "50%" }}>
                <img
                    src={suggestedUser.profilePicture || `https://i.pravatar.cc/150?u=${suggestedUser.username}`}
                    alt={suggestedUser.username}
                    className="w-9 h-9 rounded-full object-cover block"
                    style={{ border: "2px solid #111" }}
                    onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${suggestedUser.username}`; }}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">{suggestedUser.username}</p>
                <p className="text-xs text-white/35 truncate">{suggestedUser.bio || "Suggested for you"}</p>
            </div>
            <button
                onClick={handleFollow}
                disabled={following || loading}
                className="text-xs font-bold cursor-pointer border-none bg-transparent transition-colors shrink-0 disabled:opacity-60"
                style={{
                    color: following ? "rgba(255,255,255,0.3)" : "#3b82f6"
                }}
            >
                {loading ? "..." : following ? "Following" : "Follow"}
            </button>
        </div>
    );
};

const RightSidebar = () => {
    const { user } = useAuth();
    const [suggested, setSuggested] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getSuggestedUsers();
                setSuggested(data.users || []);
            } catch {
                // silently fail
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className="flex flex-col gap-6 pt-2">
            {/* Current user card */}
            <div className="flex items-center gap-3">
                <div className="ig-ring flex-shrink-0" style={{ padding: "2px", borderRadius: "50%" }}>
                    <img
                        src={user?.profilePicture || `https://i.pravatar.cc/150?u=${user?.username}`}
                        alt={user?.username}
                        className="w-11 h-11 rounded-full object-cover block"
                        style={{ border: "2px solid #111" }}
                        onError={(e) => { e.target.src = `https://i.pravatar.cc/150?u=${user?.username}`; }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight truncate">{user?.username}</p>
                    <p className="text-xs text-white/35 truncate">{user?.bio || "Welcome to Lumio 👋"}</p>
                </div>
            </div>

            {/* Suggested users */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Suggested for you</p>
                    <button className="text-xs text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer font-semibold">See all</button>
                </div>

                <div className="flex flex-col gap-4">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="skeleton w-9 h-9 rounded-full flex-shrink-0" />
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <div className="skeleton h-3 w-24 rounded" />
                                    <div className="skeleton h-2.5 w-32 rounded" />
                                </div>
                            </div>
                        ))
                    ) : suggested.length === 0 ? (
                        <p className="text-white/25 text-xs">No suggestions right now.</p>
                    ) : (
                        suggested.map(u => (
                            <SuggestedUser key={u._id} user={u} />
                        ))
                    )}
                </div>
            </div>

            {/* Footer links */}
            <div className="text-white/20 text-xs leading-relaxed mt-4">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                    {["About", "Help", "Privacy", "Terms", "Locations", "Language"].map(link => (
                        <span key={link} className="cursor-pointer hover:text-white/40 transition-colors">{link}</span>
                    ))}
                </div>
                <p>© 2026 Lumio · by Uday Vaidya</p>
            </div>
        </div>
    );
};

export default RightSidebar;
