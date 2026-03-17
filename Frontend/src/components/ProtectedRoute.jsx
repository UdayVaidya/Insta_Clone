import { Navigate } from "react-router-dom";
import { useAuth } from "../Features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full border-2 border-transparent border-t-pink-500 border-r-orange-400 animate-spin"
                    />
                    <span className="text-white/30 text-sm tracking-wider">Loading...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
