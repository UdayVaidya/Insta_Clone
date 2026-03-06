import Feed from "./Feed";
import Navbar from "../../shared/Navbar";
import { useAuth } from "../../auth/hooks/useAuth";

const MainPage = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* This container fills remaining height and does NOT scroll */}
            <div className="flex flex-1 overflow-hidden gap-4 px-6 py-4">

                {/* Left Sidebar — stays fixed */}
                <aside className="w-1/4 sticky top-0 self-start h-full border border-red-500/50 rounded-2xl p-4 flex-shrink-0">
                    <h1>Left Sidebar</h1>
                </aside>

                {/* Feed — scrolls independently */}
                <main className="flex-1 overflow-y-auto">
                    <Feed />
                </main>

                {/* Right Sidebar — stays fixed */}
                <aside className="w-1/4 sticky top-0 self-start h-full border border-blue-500/50 rounded-2xl p-4 flex-shrink-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 bg-white/10 rounded-2xl p-2">
                            <img src="https://i.pravatar.cc/150?img=1" alt="me" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="text-white font-medium">{user?.username}</p>
                                <p className="text-white/50 text-sm">@{user?.username}</p>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default MainPage;