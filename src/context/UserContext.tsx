import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Order } from "../types/orderTypes";

type UserState = {
    initialStateLoaded: boolean;
    token: string | null;
    username: string | null;
    openOrders: Order[];
    refreshOpenOrders: boolean;
};

type UserAction =
    | { type: "INITIALIZE" }
    | { type: "LOGIN"; payload: { token: string; username: string } }
    | { type: "LOGOUT" }
    | { type: "SET_TOKEN"; payload: string }
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_OPEN_ORDERS"; payload: Order[] }
    | { type: "TRIGGER_REFRESH_OPEN_ORDERS" }
    | { type: "SAVE_REFRESH_OPEN_ORDERS" };

const initialState: UserState = {
    initialStateLoaded: false,
    token: null,
    username: null,
    openOrders: [],
    refreshOpenOrders: false
};

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "INITIALIZE":
            return { ...state, initialStateLoaded: true };
        case "LOGIN":
            const loginData = {
                initialStateLoaded: true,
                token: action.payload.token,
                username: action.payload.username,
                openOrders: [],
                refreshOpenOrders: false
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
            const sortedOpenOrders = action.payload.sort((a: Order, b: Order) => {
                return a.timestamp - b.timestamp;
            })
            return { ...state, openOrders: sortedOpenOrders };
        case "LOGOUT":
            localStorage.removeItem("userData");
            return {
                initialStateLoaded: true,
                token: null,
                username: null,
                openOrders: [],
                refreshOpenOrders: false
            };
        case "TRIGGER_REFRESH_OPEN_ORDERS":
            return { ...state, refreshOpenOrders: true };
        case "SAVE_REFRESH_OPEN_ORDERS":
            return { ...state, refreshOpenOrders: false };
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
