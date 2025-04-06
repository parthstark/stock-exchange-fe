import React from "react";

const TickerList: React.FC = () => {
    return (
        <div className="space-y-4 w-full md:w-2/3 p-6">
            <h2 className="text-xl font-bold">MARKETS</h2>
            {["TATA", "RELIANCE", "INFOS", "ICICI"].map((stock) => (
                <div key={stock} className="flex items-center justify-between">
                    <span className="text-lg">{stock}</span>
                    <span className="text-green-600 text-xl">↑</span>
                </div>
            ))}
        </div>
    );
};

export default TickerList;
