import { useEffect, useState } from "react";
import { getNotifications } from "../../auth/services/notification.api";

const timeAgo = (d) => {
    if (!d) return "";
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
};

const NotificationItem = ({ notif }) => {
    const avatar = notif.from?.profilePicture || `https://i.pravatar.cc/150?u=${notif.from?.username}`;
    const username = notif.from?.username || "Someone";

    return (
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/4 transition-colors rounded-xl">
            {/* Avatar */}
            <div className="ig-ring flex-shrink-0" style={{ padding: "2px", borderRadius: "50%" }}>
                <img
                    src={avatar}
                    alt={username}
                    className="w-11 h-11 rounded-full object-cover block"
                    style={{ border: "2px solid #111" }}
                    onError={e => { e.target.src = `https://i.pravatar.cc/150?u=${username}`; }}
                />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-snug">
                    <span className="font-semibold">{username}</span>
                    {" "}{notif.text}
                </p>
                <p className="text-xs text-white/35 mt-0.5">{timeAgo(notif.createdAt)}</p>
            </div>

            {/* Thumbnail for like notifications */}
            {notif.type === "like" && notif.post?.imgURL && (
                <img
                    src={notif.post.imgURL}
                    alt="post"
                    className="w-11 h-11 object-cover rounded-lg flex-shrink-0"
                />
            )}

            {/* Follow badge */}
            {notif.type === "follow" && (
                <div
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-white flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                >
                    Follows you
                </div>
            )}
        </div>
    );
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNotifications()
            .then(d => setNotifications(d.notifications || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full px-4 py-4 flex flex-col gap-3">
                <div className="skeleton h-5 w-36 rounded mb-2" />
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="skeleton w-11 h-11 rounded-full flex-shrink-0" />
                        <div className="flex flex-col gap-1.5 flex-1">
                            <div className="skeleton h-3 w-48 rounded" />
                            <div className="skeleton h-2.5 w-24 rounded" />
                        </div>
                        <div className="skeleton w-11 h-11 rounded-lg flex-shrink-0" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full py-2">
            {/* Header */}
            <div className="px-4 pb-4">
                <h1 className="text-xl font-bold text-white">Notifications</h1>
                <p className="text-white/40 text-sm mt-0.5">Activity on your posts and profile</p>
            </div>

            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <svg className="w-8 h-8 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white/60 font-semibold">No notifications yet</p>
                        <p className="text-white/25 text-sm mt-1">When someone likes or follows you, it'll show here.</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-0.5 px-2">
                    {/* Today section */}
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider px-2 pb-1 pt-2">Recent</p>
                    {notifications.map((n, i) => (
                        <NotificationItem key={i} notif={n} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
