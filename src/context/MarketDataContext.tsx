import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useApi } from "../hooks/useApi";

// type Ticker = {
//     name: string;
//     price: number;
// };

type MarketState = {
    tickers: string[];
    tickersLoaded: boolean;
};

type MarketAction =
    | { type: "SET_TICKERS"; payload: string[] };

const initialState: MarketState = {
    tickers: [],
    tickersLoaded: false,
};

const MarketDataContext = createContext<{
    state: MarketState;
    dispatch: React.Dispatch<MarketAction>;
} | undefined>(undefined);

const marketReducer = (state: MarketState, action: MarketAction): MarketState => {
    switch (action.type) {
        case "SET_TICKERS":
            return { ...state, tickers: action.payload, tickersLoaded: true };
        default:
            return state;
    }
};

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(marketReducer, initialState);
    const { request } = useApi();

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await request("v1/market/tickers");
                dispatch({ type: "SET_TICKERS", payload: response?.tickers });
            } catch (err: any) {
                dispatch({ type: "SET_TICKERS", payload: [] });
            }
        };

        fetchTickers();
    }, []);

    return (
        <MarketDataContext.Provider value={{ state, dispatch }}>
            {children}
        </MarketDataContext.Provider>
    );
};

export const useMarketData = () => {
    const context = useContext(MarketDataContext);
    if (!context) throw new Error("useMarketData must be used within MarketDataProvider");
    return context;
};
