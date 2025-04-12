import React from "react";
import TickerList from "../components/TickerList/TickerList";
import UserHoldings from "../components/UserHoldings";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse">
            <UserHoldings />

            {/* Divider*/}
            <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

            <TickerList />
        </div>
    );
};

export default Dashboard;
