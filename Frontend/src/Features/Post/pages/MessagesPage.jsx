import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";

// Mock conversations for UI demo
const MOCK_CONVOS = [
    { id: 1, username: "alex_photo", avatar: "https://i.pravatar.cc/150?img=12", lastMsg: "Loved your last post! 🔥", time: "2m", unread: 2 },
    { id: 2, username: "sara_designs", avatar: "https://i.pravatar.cc/150?img=5", lastMsg: "Hey, are you free to collab?", time: "15m", unread: 0 },
    { id: 3, username: "mike_travels", avatar: "https://i.pravatar.cc/150?img=8", lastMsg: "Where was that photo taken?", time: "1h", unread: 1 },
    { id: 4, username: "anya_creates", avatar: "https://i.pravatar.cc/150?img=16", lastMsg: "Thanks for the like! 😊", time: "3h", unread: 0 },
    { id: 5, username: "derek_lens", avatar: "https://i.pravatar.cc/150?img=33", lastMsg: "Check out my new reel", time: "1d", unread: 0 },
];

const MOCK_MESSAGES = {
    1: [
        { from: "other", text: "Hey! Loved your last post! 🔥", time: "10:02 AM" },
        { from: "me", text: "Thanks so much! Really happy with how it turned out", time: "10:05 AM" },
        { from: "other", text: "What camera do you use?", time: "10:06 AM" },
    ],
    2: [
        { from: "other", text: "Hey, are you free to collab on a project?", time: "Yesterday" },
        { from: "me", text: "Sounds interesting! What kind of project?", time: "Yesterday" },
    ],
};

const MessagesPage = () => {
    const { user } = useAuth();
    const [activeConvo, setActiveConvo] = useState(null);
    const [draft, setDraft] = useState("");
    const [localMsgs, setLocalMsgs] = useState(MOCK_MESSAGES);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!draft.trim() || !activeConvo) return;
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLocalMsgs(prev => ({
            ...prev,
            [activeConvo.id]: [...(prev[activeConvo.id] || []), { from: "me", text: draft.trim(), time: now }]
        }));
        setDraft("");
    };

    const msgs = activeConvo ? (localMsgs[activeConvo.id] || []) : [];

    return (
        <div className="flex w-full h-full" style={{ minHeight: "calc(100vh - 0px)" }}>

            {/* Conversations list */}
            <div
                className={`flex flex-col border-r border-white/8 ${activeConvo ? "hidden md:flex w-80 flex-shrink-0" : "flex-1 md:w-80 md:flex-shrink-0"}`}
                style={{ background: "#0d0d0d" }}
            >
                <div className="px-4 py-4 border-b border-white/8">
                    <h1 className="text-xl font-bold text-white">{user?.username}</h1>
                    <p className="text-white/40 text-xs mt-0.5">Messages</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_CONVOS.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setActiveConvo(c)}
                            className="w-full flex items-center gap-3 px-4 py-3 border-none cursor-pointer text-left transition-colors"
                            style={{
                                background: activeConvo?.id === c.id ? "rgba(255,255,255,0.07)" : "transparent",
                            }}
                            onMouseEnter={e => { if (activeConvo?.id !== c.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={e => { if (activeConvo?.id !== c.id) e.currentTarget.style.background = "transparent"; }}
                        >
                            <div className="relative flex-shrink-0">
                                <img src={c.avatar} alt={c.username} className="w-12 h-12 rounded-full object-cover" />
                                {c.unread > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                        style={{ background: "linear-gradient(45deg, #f09433, #bc1888)" }}>
                                        {c.unread}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm leading-none mb-1 ${c.unread ? "font-semibold text-white" : "font-medium text-white/80"}`}>{c.username}</p>
                                <p className={`text-xs truncate ${c.unread ? "text-white/70" : "text-white/35"}`}>{c.lastMsg}</p>
                            </div>
                            <span className="text-[10px] text-white/30 flex-shrink-0">{c.time}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            {activeConvo ? (
                <div className="flex-1 flex flex-col" style={{ background: "#0a0a0a" }}>
                    {/* Chat header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8" style={{ background: "#0d0d0d" }}>
                        <button
                            onClick={() => setActiveConvo(null)}
                            className="md:hidden text-white/60 bg-transparent border-none cursor-pointer p-1 mr-1"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <img src={activeConvo.avatar} alt={activeConvo.username} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                            <p className="text-sm font-semibold text-white">{activeConvo.username}</p>
                            <p className="text-xs text-white/35">Active now</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                        {msgs.length === 0 && (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-white/25 text-sm">Start the conversation 👋</p>
                            </div>
                        )}
                        {msgs.map((m, i) => (
                            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm"
                                    style={{
                                        background: m.from === "me"
                                            ? "linear-gradient(135deg, #f09433, #dc2743, #bc1888)"
                                            : "rgba(255,255,255,0.08)",
                                        color: "white",
                                        borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"
                                    }}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
                        <div
                            className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full"
                            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            <input
                                type="text"
                                value={draft}
                                onChange={e => setDraft(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!draft.trim()}
                            className="border-none cursor-pointer p-2 rounded-full disabled:opacity-30 transition-opacity"
                            style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            ) : (
                // No convo selected (desktop)
                <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <svg className="w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <p className="text-white/50 font-semibold">Your messages</p>
                        <p className="text-white/25 text-sm mt-1">Select a conversation to read messages</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
