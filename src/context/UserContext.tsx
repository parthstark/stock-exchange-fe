import React, { createContext, useReducer, useContext, useEffect } from "react";

type UserState = {
    token: string | null;
    username: string | null;
    initialStateLoaded: boolean;
};

type UserAction =
    | { type: "INITIALIZE" }
    | { type: "LOGIN"; payload: { token: string; username: string } }
    | { type: "LOGOUT" }
    | { type: "SET_TOKEN"; payload: string }
    | { type: "SET_USERNAME"; payload: string };

const initialState: UserState = {
    token: null,
    username: null,
    initialStateLoaded: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
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
            localStorage.setItem("userData", JSON.stringify(loginData));
            return loginData;
        case "SET_TOKEN":
            const updatedToken = { ...state, token: action.payload };
            localStorage.setItem("userData", JSON.stringify(updatedToken));
            return updatedToken;
        case "SET_USERNAME":
            const updatedUsername = { ...state, username: action.payload };
            localStorage.setItem("userData", JSON.stringify(updatedUsername));
            return updatedUsername;
        case "LOGOUT":
            localStorage.removeItem("userData");
            return { token: null, username: null, initialStateLoaded: true };
        default:
            return state;
    }
};

const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
} | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        dispatch({ type: "INITIALIZE" });
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                if (parsed.token && parsed.username) {
                    dispatch({ type: "LOGIN", payload: parsed });
                }
            } catch (e) {
                console.error("Failed to parse userData:", e);
            }
        }
    }, []);

    return <UserContext.Provider value={{ state, dispatch }}> {children} </UserContext.Provider>
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
