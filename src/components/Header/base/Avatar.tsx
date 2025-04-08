import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
    initials: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ initials, className }) => {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const {
        state: { username },
        dispatch,
    } = useUser();

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => setShowMenu((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                onClick={toggleMenu}
                className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            >
                <span className="text-black text-lg">{initials}</span>
            </div>

            {showMenu && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">

                    <div className="px-4 py-2 font-light text-gray-800">
                        Hi {username} !
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 mx-3" />

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                        logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Avatar;
