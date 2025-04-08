import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        state: { token, initialStateLoaded },
    } = useUser();

    if (!initialStateLoaded) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
