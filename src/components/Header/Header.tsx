import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "./base/Avatar";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const {
        state: { username },
    } = useAuth();

    const initials = useMemo(() => {
        return username?.slice(0, 2).toUpperCase() || "";
    }, [username]);

    const navigate = useNavigate();

    return (
        <header className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                {/* Top row: logo and avatar */}
                <div className="flex justify-between items-center w-full md:w-auto">
                    <h2 className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/")}>
                        📈 STOCK EXCHANGE
                    </h2>
                    {/* Avatar (only on mobile) */}
                    <Avatar initials={initials} className="md:hidden" />
                </div>

                {/* Search bar - centered on desktop with margin left auto */}
                <div className="w-full md:w-auto md:ml-auto md:mr-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-96 h-10 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Avatar (only on desktop) */}
                <Avatar initials={initials} className="hidden md:flex" />
            </div>
        </header>
    );
};

export default Header;
