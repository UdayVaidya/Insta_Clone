import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

const Login = ({ onSwitch }) => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("");
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin(identifier, password)

        navigate('/feed');

    }

    return (
        <form className="flex flex-col gap-4 w-72" onSubmit={handleSubmit}>
            {loading && <p>Loading...</p>}
            {/* Title */}
            <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                <p className="text-sm text-gray-400 mt-1">Welcome back! Please enter your details.</p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Email or Username</label>
                <input type="text" placeholder="you@example.com or username" value={identifier} onChange={(e) => setIdentifier(e.target.value)}
                    className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300 transition-all duration-200" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300 transition-all duration-200" />
            </div>

            {/* Submit */}
            <button type="submit" className="mt-1 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Switch */}
            <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }} className="text-blue-600 font-medium hover:underline">
                    Register
                </a>
            </p>
        </form>
    )
}

export default Login
