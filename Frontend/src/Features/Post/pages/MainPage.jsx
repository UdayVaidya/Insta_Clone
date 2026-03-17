import { useState } from "react";
import Feed from "./Feed";
import ExplorePage from "./ExplorePage";
import NotificationsPage from "./NotificationsPage";
import MessagesPage from "./MessagesPage";
import SavedPage from "./SavedPage";
import LeftSidebar from "../../shared/LeftSidebar";
import RightSidebar from "../../shared/RightSidebar";
import CreatePostModal from "../components/CreatePostModal";

// Which views show the right sidebar
const WITH_RIGHT_SIDEBAR = ["home"];
// Which views go full-width (no max-w constraint)
const FULL_WIDTH_VIEWS = ["messages"];

const MainContent = ({ view }) => {
    switch (view) {
        case "home":         return <Feed />;
        case "explore":      return <ExplorePage />;
        case "notifications":return <NotificationsPage />;
        case "messages":     return <MessagesPage />;
        case "saved":        return <SavedPage />;
        default:             return <Feed />;
    }
};

const MainPage = () => {
    const [activeView, setActiveView] = useState("home");
    const [showCreatePost, setShowCreatePost] = useState(false);

    const showRightSidebar = WITH_RIGHT_SIDEBAR.includes(activeView);
    const isFullWidth = FULL_WIDTH_VIEWS.includes(activeView);

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">

            {/* ── LEFT SIDEBAR ── */}
            <aside
                className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 sticky top-0 h-screen border-r border-white/5"
                style={{ background: "#0d0d0d" }}
            >
                <LeftSidebar
                    activeView={activeView}
                    onViewChange={setActiveView}
                    onCreatePost={() => setShowCreatePost(true)}
                />
            </aside>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 flex justify-center overflow-y-auto min-h-screen">
                {isFullWidth ? (
                    // Full-width layout (e.g. messages)
                    <div className="w-full flex" style={{ minHeight: "100vh" }}>
                        <MainContent view={activeView} />
                    </div>
                ) : (
                    // Centered column with optional right sidebar
                    <div className={`w-full flex ${showRightSidebar ? "justify-center" : "justify-center"}`}>
                        <div className="w-full max-w-[500px] py-4">
                            <MainContent view={activeView} />
                        </div>
                    </div>
                )}
            </main>

            {/* ── RIGHT SIDEBAR (home only) ── */}
            {showRightSidebar && (
                <aside
                    className="hidden xl:flex flex-col w-80 flex-shrink-0 sticky top-0 h-screen overflow-y-auto px-6 border-l border-white/5"
                    style={{ background: "#0d0d0d" }}
                >
                    <RightSidebar />
                </aside>
            )}

            {/* ── MOBILE BOTTOM NAV ── */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2 border-t border-white/8"
                style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
            >
                {[
                    {
                        id: "home", icon: (a) => (
                            <svg className="w-6 h-6" fill={a ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        )
                    },
                    {
                        id: "explore", icon: (a) => (
                            <svg className="w-6 h-6" fill={a ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        )
                    },
                    { id: "create", isCreate: true },
                    {
                        id: "notifications", icon: (a) => (
                            <svg className="w-6 h-6" fill={a ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        )
                    },
                    {
                        id: "saved", icon: (a) => (
                            <svg className="w-6 h-6" fill={a ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={a ? 0 : 1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        )
                    },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => item.isCreate ? setShowCreatePost(true) : setActiveView(item.id)}
                        className="bg-transparent border-none cursor-pointer p-2 transition-colors"
                        style={{ color: activeView === item.id ? "white" : "rgba(255,255,255,0.4)" }}
                    >
                        {item.isCreate ? (
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        ) : item.icon(activeView === item.id)}
                    </button>
                ))}
            </nav>

            {/* ── CREATE POST MODAL ── */}
            {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} />}
        </div>
    );
};

export default MainPage;