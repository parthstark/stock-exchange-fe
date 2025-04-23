import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useUser } from "../context/UserContext";
import { useDemoMode } from "../context/DemoModeContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useUser();
    const { demoMode, setDemoMode } = useDemoMode();
    const navigate = useNavigate();

    const { loading, error, request } = useApi();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await request("/v1/auth/login", "POST", { username, password });

        if (response?.token) {
            dispatch({
                type: "LOGIN",
                payload: {
                    token: response.token,
                    username,
                    demoMode
                },
            });
            navigate("/");
        }
    };

    const handleDemoToggle = () => {
        setDemoMode(!demoMode);
    };

    const handleViewArchitectureOnClick = () => {
        navigate("/architecture")
    }

    return (
        <div>
            <div className="relative min-h-screen flex items-center justify-center bg-gray-50">
                {/* Demo Mode Toggle */}
                <button
                    onClick={handleDemoToggle}
                    className={`absolute top-6 right-6 text-sm px-3 py-1 rounded-full transition font-medium
        ${demoMode
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    {demoMode ? "Demo Mode ✅" : "Demo Mode ❌"}
                </button>

                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        STOCK EXCHANGE
                    </h1>

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <div className="absolute bottom-5 cursor-pointer font-light text-sm text-gray-700 hover:scale-110 transition"
                    onClick={handleViewArchitectureOnClick}
                >view working architecture</div>
            </div>
        </div>
    );
};

export default Login;
