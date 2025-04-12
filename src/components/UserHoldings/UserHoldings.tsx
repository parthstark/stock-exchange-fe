import React from "react";
import OpenOrders from "../OpenOrders";

const UserHoldings: React.FC = () => {
    // const r2 = await request("/v1/user/holdings");

    return (
        <div className="space-y-12 w-full md:w-1/3 p-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-medium">Balance</div>
                    <div className="text-lg font-medium text-right">$10,000.00</div>
                </div>

                <div className="space-y-1">
                    <div className="text-xl font-medium">Holdings</div>

                    <div className="flex justify-between items-center">
                        <div className="w-1/3 text-left text-md">TATA</div>
                        <div className="w-1/3 text-center text-md">100000</div>
                        <div className="w-1/3 text-right text-md">222.22</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="w-1/3 text-left text-md">RELIANCE</div>
                        <div className="w-1/3 text-center text-md">15</div>
                        <div className="w-1/3 text-right text-md">897.00</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="w-1/3 text-left text-md">ZOMATO</div>
                        <div className="w-1/3 text-center text-md">25</div>
                        <div className="w-1/3 text-right text-md">1220.88</div>
                    </div>
                </div>
            </div>

            <OpenOrders />
        </div>
    );
};

export default UserHoldings;
