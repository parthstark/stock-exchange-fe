import React from "react";
import Header from "../components/Header";
import TickerList from "../components/TickerList/TickerList";
import UserActions from "../components/UserActions";

const Dashboard: React.FC = () => {
    return (
        <div className="font-sans">
            <Header />

            <div className="flex flex-col md:flex-row-reverse">
                <UserActions />

                {/* Divider*/}
                <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

                <TickerList />
            </div>
        </div>
    );
};

export default Dashboard;
