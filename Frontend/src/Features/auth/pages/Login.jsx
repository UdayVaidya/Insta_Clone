import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

const Login = ({ onSwitch }) => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
        try {
            await handleLogin(identifier, password)
            navigate('/feed');
        } catch (err) {
            const msg = err?.response?.data?.message || "Login failed. Please check your credentials.";
            setError(msg);
        }
    }

    const inputClass = `
        w-full px-4 py-3 rounded-xl text-sm text-white
        bg-white/8 border border-white/10
        placeholder:text-white/30
        focus:outline-none focus:border-white/30 focus:bg-white/12
        transition-all duration-200
    `;

    return (
        <form className="flex flex-col gap-5 w-full max-w-sm px-8 md:px-6 md:w-80" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
                <p className="text-sm text-white/45 mt-1">Welcome back! Enter your details below.</p>
            </div>

            {/* Error */}
            {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                    {error}
                </div>
            )}

            {/* Email / Username */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">Email or Username</label>
                <input
                    type="text"
                    placeholder="you@example.com or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={inputClass}
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-1 py-3 rounded-xl text-sm font-bold text-white tracking-wide cursor-pointer
                    active:scale-[0.97] transition-all duration-200 shadow-lg
                    disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: loading ? 'rgba(255,255,255,0.15)' : 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Signing In...
                    </span>
                ) : "Sign In"}
            </button>

            {/* Switch */}
            <p className="text-center text-sm text-white/40">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-semibold cursor-pointer transition-opacity hover:opacity-80"
                    style={{ background: 'linear-gradient(45deg, #f09433, #bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Register
                </button>
            </p>
        </form>
    )
}

export default Login
