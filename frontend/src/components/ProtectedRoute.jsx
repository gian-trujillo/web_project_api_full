import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
    const location = useLocation();
    const from = location.state?.from || "/";

    if (isLoggedIn && anonymous) {
        return <Navigate to={from} replace />;
    }

    if (!isLoggedIn && !anonymous) {
        return <Navigate to="/login" replace />;
    }

    return children;
}