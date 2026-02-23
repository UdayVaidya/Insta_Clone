import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Features/auth/pages/AuthPage";
import Feed from "./Features/Post/pages/Feed";


const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Auth routes */}
                <Route path="/login" element={<AuthPage defaultView="login" />} />
                <Route path="/register" element={<AuthPage defaultView="register" />} />

                <Route path="/feed" element={<Feed />} />

                {/* Catch-all → redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AuthRoutes;
