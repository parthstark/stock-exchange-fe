import React, { createContext, useReducer, useContext, useEffect } from "react";

type AuthState = {
    token: string | null;
    username: string | null;
    initialStateLoaded: boolean;
};

type AuthAction =
    | { type: "INITIALIZE" }
    | { type: "LOGIN"; payload: { token: string; username: string } }
    | { type: "LOGOUT" }
    | { type: "SET_TOKEN"; payload: string }
    | { type: "SET_USERNAME"; payload: string };

const initialState: AuthState = {
    token: null,
    username: null,
    initialStateLoaded: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "INITIALIZE":
            return {
                ...state,
                initialStateLoaded: true,
            };
        case "LOGIN":
            const loginData = {
                token: action.payload.token,
                username: action.payload.username,
                initialStateLoaded: true,
            };
            localStorage.setItem("authData", JSON.stringify(loginData));
            return loginData;
        case "SET_TOKEN":
            const updatedToken = { ...state, token: action.payload };
            localStorage.setItem("authData", JSON.stringify(updatedToken));
            return updatedToken;
        case "SET_USERNAME":
            const updatedUsername = { ...state, username: action.payload };
            localStorage.setItem("authData", JSON.stringify(updatedUsername));
            return updatedUsername;
        case "LOGOUT":
            localStorage.removeItem("authData");
            return { token: null, username: null, initialStateLoaded: true };
        default:
            return state;
    }
};

const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const authData = localStorage.getItem("authData");
        dispatch({ type: "INITIALIZE" });
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed.token && parsed.username) {
                    dispatch({ type: "LOGIN", payload: parsed });
                }
            } catch (e) {
                console.error("Failed to parse authData:", e);
            }
        }
    }, []);

    return <AuthContext.Provider value={{ state, dispatch }}> {children} </AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
