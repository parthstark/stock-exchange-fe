import React from "react";
import { useNavigate } from "react-router-dom";

const TickerList: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4 w-full md:w-2/3 p-6">
            <h2 className="text-xl font-bold">MARKETS</h2>
            {["TATA", "RELIANCE", "INFY", "ICICI", "TATA", "RELIANCE", "INFY", "ICICI", "TATA", "RELIANCE", "INFY", "ICICI", "TATA", "RELIANCE", "INFY", "ICICI"].map((stock) => (
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
