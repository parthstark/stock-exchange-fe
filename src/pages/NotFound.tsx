import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
            <Link
                to="/"
                className="text-white bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition"
            >
                Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
