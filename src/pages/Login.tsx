import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const { loading, error, request } = useApi();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await request("v1/auth/login", "POST", { username, password });

        if (response?.token) {
            dispatch({
                type: "LOGIN",
                payload: {
                    token: response.token,
                    username,
                },
            });
            navigate("/app");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
        </div>
    );
};

export default Login;
