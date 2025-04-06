import React from "react";

const UserActions: React.FC = () => {
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
                        <div className="text-md">TATA</div>
                        <div className="text-md text-right">100</div>
                        <div className="text-md text-right">222.22</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-md">RELIANCE</div>
                        <div className="text-md text-right">15</div>
                        <div className="text-md text-right">897.00</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-md">ZOMATO</div>
                        <div className="text-md text-right">25</div>
                        <div className="text-md text-right">1220.88</div>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <div className="text-xl font-medium">Open Orders</div>

                <div className="flex justify-between items-center">
                    <div className="text-md">ITBEES</div>
                    <div className="text-md text-right">100</div>
                    <div className="text-md text-right">554.01</div>
                </div>
            </div>
        </div>
    );
};

export default UserActions;
