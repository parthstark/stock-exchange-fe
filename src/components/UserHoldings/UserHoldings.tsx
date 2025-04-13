import React, { useEffect } from "react";
import OpenOrders from "../OpenOrders";
import { useApi } from "../../hooks/useApi";
import { useUser } from "../../context/UserContext";

const UserHoldings: React.FC = () => {
    const { request, loading, error } = useApi();
    const { state: { userHoldings, refreshUserHoldings }, dispatch } = useUser();

    useEffect(() => {
        fetchHoldings()
    }, [])

    useEffect(() => {
        if (refreshUserHoldings) {
            fetchHoldings();
            dispatch({ type: "SAVE_REFRESH_USER_HOLDINGS" });
        }
    }, [refreshUserHoldings]);

    const fetchHoldings = async () => {
        const response = await request("/v1/user/holdings");
        dispatch({ type: "SET_USER_HOLDINGS", payload: response?.userHoldings });
    }

    return (
        <div className="space-y-12 w-full md:w-1/3 p-6">
            <div className="space-y-4">
                {/* USER CASH BALANCE */}
                <div className="flex-col">
                    <div className="flex justify-between">
                        <div className="text-xl font-medium">Balance</div>
                        {(loading || error) &&
                            <div className="text-lg font-medium text-right">...</div>
                        }
                        {!loading &&
                            <div className="text-lg font-medium text-right">₹{((userHoldings.get('cash')?.available ?? 0) + (userHoldings.get('cash')?.locked ?? 0)).toLocaleString()}</div>
                        }
                    </div>
                    {(loading || error) &&
                        <div className="h-8" />
                    }
                    {!loading &&
                        <>
                            <div className="text-xs font-light text-gray-500">Locked: {(userHoldings.get('cash')?.locked ?? 0)}</div>
                            <div className="text-xs font-light text-gray-500">Available: {(userHoldings.get('cash')?.available ?? 0)}</div>
                        </>
                    }
                </div>

                {/* USER HOLDINGS */}
                <div className="space-y-1">
                    <div className="text-xl font-medium">Holdings</div>

                    <div className="flex justify-between items-center">
                        <div className="w-1/2 text-left text-xs font-light text-gray-500">STOCK</div>
                        <div className="w-1/2 text-right text-xs font-light text-gray-500">QUANTITY</div>
                        {/* <div className="w-1/3 text-right text-xs font-light text-gray-500">PRICE</div> */}
                    </div>
                    <div className="h-px bg-gray-200" />

                    {loading &&
                        <div className="h-5 bg-gray-100 animate-pulse my-2" />
                    }

                    {!loading && Array.from(userHoldings).map(([ticker, holding]) => {
                        if (ticker === 'cash') return null
                        return (
                            <div key={ticker} className="flex justify-between items-center">
                                <div className="w-1/2 text-left text-md">{ticker}</div>
                                <div className="w-1/2 text-right text-md">{holding.available + holding.locked}</div>
                                {/* <div className="w-1/3 text-right text-md">1220.88</div> */}
                            </div>
                        );
                    })}

                </div>
            </div>

            <OpenOrders />
        </div>
    );
};

export default UserHoldings;
