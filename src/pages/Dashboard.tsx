import React from "react";
import Header from "../components/Header";
import TickerList from "../components/TickerList/TickerList";
import UserActions from "../components/UserActions";

const Dashboard: React.FC = () => {
    return (
        <div className="font-sans">
            <Header />

            <div className="flex flex-col md:flex-row-reverse p-6 gap-6">
                <UserActions />
                <TickerList />
            </div>
        </div>
    );
};

export default Dashboard;
