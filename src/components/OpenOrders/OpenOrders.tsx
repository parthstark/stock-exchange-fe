import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useUser } from "../../context/UserContext";

const OpenOrders: React.FC = () => {
    const { request, loading, error } = useApi();
    const { state: { openOrders }, dispatch } = useUser();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await request("/v1/order/open");
        dispatch({ type: "SET_OPEN_ORDERS", payload: response?.openOrders });
    };

    if (loading || error) return null

    return (
        <div className="space-y-1">
            <div className="text-xl font-medium">Open Orders</div>

            {openOrders.length === 0 ? (
                <div className="text-md text-gray-500">No open orders</div>
            ) : (
                openOrders.map((order) => (
                    <div key={order.orderId}
                        className={`flex justify-between items-center ${order.side === 'buy'
                            ? 'bg-green-100' : 'bg-red-100'} p-1 my-2`}>
                        <div className="w-1/3 text-left text-md text-gray-700">{order.ticker}</div>
                        <div className="w-1/3 text-center text-md text-gray-500">{order.quantity}</div>
                        <div className="w-1/3 text-right text-md text-gray-500">{order.limitPrice}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OpenOrders;
