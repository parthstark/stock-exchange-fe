import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Order } from "../types/orderTypes";

type UserState = {
    token: string | null;
    username: string | null;
    initialStateLoaded: boolean;
    openOrders: Order[];
};

type UserAction =
    | { type: "INITIALIZE" }
    | { type: "LOGIN"; payload: { token: string; username: string } }
    | { type: "LOGOUT" }
    | { type: "SET_TOKEN"; payload: string }
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_OPEN_ORDERS"; payload: Order[] };

const initialState: UserState = {
    token: null,
    username: null,
    openOrders: [],
    initialStateLoaded: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "INITIALIZE":
            return { ...state, initialStateLoaded: true };
        case "LOGIN":
            const loginData = {
                token: action.payload.token,
                username: action.payload.username,
                openOrders: [],
                initialStateLoaded: true,
            };
            localStorage.setItem("userData", JSON.stringify({
                token: loginData.token,
                username: loginData.username,
            }));
            return loginData;
        case "SET_TOKEN":
            localStorage.setItem("userData", JSON.stringify({
                token: action.payload,
                username: state.username,
            }));
            return { ...state, token: action.payload };
        case "SET_USERNAME":
            localStorage.setItem("userData", JSON.stringify({
                token: state.token,
                username: action.payload,
            }));
            return { ...state, username: action.payload };
        case "SET_OPEN_ORDERS":
            return { ...state, openOrders: action.payload };
        case "LOGOUT":
            localStorage.removeItem("userData");
            return { token: null, username: null, openOrders: [], initialStateLoaded: true };
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
    console.log(context.state.token)
    return context;
};
