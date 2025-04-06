import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        state: { token, initialStateLoaded },
    } = useAuth();

    if (!initialStateLoaded) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
