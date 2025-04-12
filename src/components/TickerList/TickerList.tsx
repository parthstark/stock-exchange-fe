import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMarketData } from "../../context/MarketDataContext";
import { useApi } from "../../hooks/useApi";

const TickerList: React.FC = () => {
    const navigate = useNavigate();

    const { request } = useApi();
    const { state: { tickers, tickersLoaded }, dispatch } = useMarketData();

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await request("/v1/market/tickers");
                dispatch({ type: "SET_TICKERS", payload: response?.tickers });
            } catch (err: any) {
                dispatch({ type: "SET_TICKERS", payload: [] });
            }
        };

        fetchTickers();
    }, []);


    if (!tickersLoaded) return <div className="flex w-2/3 items-center justify-center text-gray-700 font-light text-lg">loading...</div>

    return (
        <div className="space-y-4 w-full md:w-2/3 p-6">
            <h2 className="text-xl font-bold">MARKETS</h2>
            {tickers.map((stock) => (
                <div onClick={() => navigate(`/market/${stock}`)} className="cursor-pointer" key={stock}>
                    <div className="flex items-center justify-between">
                        <span className="text-lg">{stock}</span>
                        <span className="text-green-600 text-xl">↑</span>
                    </div>
                    {/* Divider */}
                    <div className="h-px bg-gray-200 mt-2" />
                </div>
            ))}
        </div>
    );
};

export default TickerList;
