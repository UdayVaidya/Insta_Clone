import { useContext } from "react";
import { GlobalContext } from "../../context/global.context";
const Navbar = () => {
    const { theme } = useContext(GlobalContext);
    return (
    <header
        className="sticky top-0 z-50 flex justify-center border-b border-white/5"
        style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)' }}
    >
        <div className="w-full max-w-[480px] px-4 py-3 flex items-center justify-between">
            {/* Logo wordmark */}
            <span
                className="text-xl font-bold tracking-tight select-none"
                style={{
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Lumio
            </span>

            {/* Right icons */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <button className="text-white/70 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

                {/* New post */}
                <button className="text-white/70 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                {/* Avatar */}
                <div className="ig-ring cursor-pointer" style={{ padding: '2px', borderRadius: '50%' }}>
                    <img
                        src="https://i.pravatar.cc/150?img=1"
                        alt="me"
                        className="w-7 h-7 rounded-full object-cover"
                        style={{ border: '2px solid #0a0a0a' }}
                    />
                </div>
            </div>


        </div>
    </header>
);
}
export default Navbar;