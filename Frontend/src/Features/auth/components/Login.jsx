import { useState } from "react"

const Login = ({ onSwitch }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form className="flex flex-col gap-4 w-72" onSubmit={(e) => e.preventDefault()}>

            {/* Title */}
            <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                <p className="text-sm text-gray-400 mt-1">Welcome back! Please enter your details.</p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input type="text" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} 
                className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300 transition-all duration-200" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-300 transition-all duration-200" />
            </div>

            {/* Submit */}
            <button type="submit" className="mt-1 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm">
                Sign In
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
