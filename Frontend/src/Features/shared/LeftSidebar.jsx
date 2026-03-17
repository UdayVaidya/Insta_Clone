import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const NAV_ITEMS = [
    {
        id: "home",
        label: "Home",
        icon: (active) => (
            <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
    },
    {
        id: "explore",
        label: "Explore",
        icon: (active) => (
            <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        ),
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: (active) => (
            <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
        ),
    },
    {
        id: "messages",
        label: "Messages",
        icon: (active) => (
            <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
        ),
    },
    {
        id: "saved",
        label: "Saved",
        icon: (active) => (
            <svg className="w-6 h-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
        ),
    },
];

const LeftSidebar = ({ activeView, onViewChange, onCreatePost }) => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex flex-col h-full py-6 px-3">
            {/* Logo */}
            <span
                className="text-2xl font-bold tracking-tight select-none mb-8 px-3 cursor-pointer"
                style={{
                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                onClick={() => onViewChange("home")}
            >
                Lumio
            </span>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ id, label, icon }) => {
                    const isActive = activeView === id;
                    return (
                        <button
                            key={id}
                            onClick={() => onViewChange(id)}
                            className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none text-left"
                            style={{
                                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                                color: isActive ? "white" : "rgba(255,255,255,0.55)",
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                        >
                            {icon(isActive)}
                            <span className={`text-sm ${isActive ? "font-semibold text-white" : "font-medium"}`}>
                                {label}
                            </span>
                        </button>
                    );
                })}

                {/* Create Post */}
                <button
                    onClick={onCreatePost}
                    id="sidebar-create-btn"
                    className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none text-left mt-1"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-sm font-medium">Create</span>
                </button>
            </nav>

            {/* Profile + Logout */}
            <div className="flex flex-col gap-1 mt-4">
                <button
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border-none text-left"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                >
                    <img
                        src={user?.profilePicture || `https://i.pravatar.cc/150?u=${user?.username}`}
                        alt={user?.username}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                        onError={e => { e.target.src = `https://i.pravatar.cc/150?u=${user?.username}`; }}
                    />
                    <span className="text-sm font-medium truncate">{user?.username || "Profile"}</span>
                </button>

                <button
                    onClick={onLogout}
                    id="sidebar-logout-btn"
                    className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none text-left"
                    style={{ color: "rgba(239,68,68,0.6)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "rgb(239,68,68)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(239,68,68,0.6)"; }}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    <span className="text-sm font-medium">Log out</span>
                </button>
            </div>
        </div>
    );
};

export default LeftSidebar;
