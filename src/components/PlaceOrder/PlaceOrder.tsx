import { useMemo, useState } from "react";
import { OrderSide } from "../../types/orderTypes";
import { useApi } from "../../hooks/useApi";
import OpenOrders from "../OpenOrders";
import { useUser } from "../../context/UserContext";

interface Props {
    ticker: string;
}

const PlaceOrder = ({ ticker }: Props) => {
    const [orderType, setOrderType] = useState<OrderSide>('buy');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const { request, loading, error } = useApi();
    const { state: { userHoldings }, dispatch } = useUser()
    const cashHolding = userHoldings.get('cash')
    const stockHolding = userHoldings.get(ticker)

    const handlePlaceOrder = async () => {
        await request("/v1/order", "POST", {
            side: orderType,
            quantity: quantity,
            ticker: ticker,
            limitPrice: price
        });
        dispatch({ type: "TRIGGER_REFRESH_OPEN_ORDERS" });
        dispatch({ type: "TRIGGER_REFRESH_USER_HOLDINGS" });
    };

    const total = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-bold text-gray-800">Place Order</h2>

            {/* BUY / SELL Tabs */}
            <div className="flex overflow-hidden rounded-md">
                <button
                    onClick={() => setOrderType('buy')}
                    className={`w-1/2 py-2 text-center font-semibold ${orderType === "buy"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:text-green-600"
                        }`}
                >
                    BUY
                </button>
                <button
                    onClick={() => setOrderType('sell')}
                    className={`w-1/2 py-2 text-center font-semibold ${orderType === "sell"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:text-red-600"
                        }`}
                >
                    SELL
                </button>
            </div>

            {/* Price Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                </label>
                <input
                    type="number"
                    value={price > 0 ? price : ''}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Balance: ₹{(cashHolding?.available ?? 0).toLocaleString()}
                </p>
            </div>

            {/* Quantity Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                </label>
                <input
                    type="number"
                    value={quantity > 0 ? quantity : ''}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Holdings: {(stockHolding?.available ?? 0)} units
                </p>
            </div>

            {/* Total Value (Read-Only) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total (₹)
                </label>
                <input
                    type="number"
                    value={isNaN(total) ? 0 : total.toFixed(2)}
                    readOnly
                    className="w-full p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                />
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 font-semibold rounded-md transition 
                    ${orderType === "buy"
                        ? "bg-green-500 text-white hover:bg-green-300"
                        : "bg-red-500 text-white hover:bg-red-300"}
                    ${loading ? "cursor-not-allowed" : ""}
                    `}
                disabled={loading}
            >
                {!loading ? 'Place order' : 'Placing order...'}
            </button>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <OpenOrders filter={ticker} />
        </div>
    );
};

export default PlaceOrder;
