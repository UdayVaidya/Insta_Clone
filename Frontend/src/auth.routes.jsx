import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Features/auth/pages/AuthPage";
import MainPage from "./Features/Post/pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to /feed */}
                <Route path="/" element={<Navigate to="/feed" replace />} />

                {/* Auth routes */}
                <Route path="/login" element={<AuthPage defaultView="login" />} />
                <Route path="/register" element={<AuthPage defaultView="register" />} />

                {/* Protected routes */}
                <Route path="/feed" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />

                {/* Catch-all → redirect to feed */}
                <Route path="*" element={<Navigate to="/feed" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AuthRoutes;
