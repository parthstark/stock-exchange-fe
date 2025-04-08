import React, { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useUser } from "../../context/UserContext";

interface OpenOrdersProps {
    filter?: string;
}

const OpenOrders: React.FC<OpenOrdersProps> = ({ filter }) => {
    const { request, loading, error } = useApi();
    const { state: { openOrders, refreshOpenOrders }, dispatch } = useUser();

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (refreshOpenOrders) {
            fetchOrders();
            dispatch({ type: "SAVE_REFRESH_OPEN_ORDERS" });
        }
    }, [refreshOpenOrders]);

    const fetchOrders = async () => {
        const response = await request("/v1/order/open");
        dispatch({ type: "SET_OPEN_ORDERS", payload: response?.openOrders });
    };

    const handleCancelOrder = async (orderId: string) => {
        alert(orderId)
        // const response = await request(`/v1/order/${orderId}`, "DELETE");
        // fetchOrders();
    };

    const filteredOpenOrders = openOrders.filter(order =>
        order.ticker.includes(filter ?? "")
    );

    return (
        <div className="space-y-1">
            <div className="text-xl font-medium">Open Orders</div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {loading && (
                <div>
                    {[...Array(3)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center p-1 my-2 h-8 bg-gray-100 animate-pulse rounded"
                        />
                    ))}
                </div>
            )}

            {!loading && filteredOpenOrders.length === 0 && (
                <div className="text-md text-gray-500">
                    No open orders {filter && `for ${filter}`}
                </div>
            )}

            {!loading && filteredOpenOrders.map((order) => (
                <div
                    key={order.orderId}
                    className={`flex justify-between items-center ${order.side === 'buy'
                        ? 'bg-green-100'
                        : 'bg-red-100'} p-1 my-2 rounded`}
                >
                    <div className="w-1/3 text-left text-md text-gray-700 ml-2">
                        {order.ticker}
                    </div>
                    <div className="w-1/3 text-center text-md text-gray-500">
                        {order.quantity}
                    </div>
                    <div className="w-1/3 text-right text-md text-gray-500 flex items-center justify-end gap-2">
                        {order.limitPrice}
                        <button onClick={() => handleCancelOrder(order.orderId)} className="rounded-md h-7 w-7 shadow text-lg mx-2 px-0.5 hover:scale-110 transition">
                            ❌
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpenOrders;
