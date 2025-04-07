import { useMemo, useState } from "react";

interface Props {
    market?: string;
}

const PlaceOrder = ({ market }: Props) => {
    const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);


    // Dummy values – replace with actual user data later
    const userBalance = 10000;
    const userHolding = 25;
    const total = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

    const handleOrder = () => {
        alert(`${orderType} order placed for ${quantity} units of ${market} at ₹${price}`);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-bold text-gray-800">Place Order</h2>

            {/* BUY / SELL Tabs */}
            <div className="flex overflow-hidden rounded-md">
                <button
                    onClick={() => setOrderType("BUY")}
                    className={`w-1/2 py-2 text-center font-semibold ${orderType === "BUY"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:text-green-600"
                        }`}
                >
                    BUY
                </button>
                <button
                    onClick={() => setOrderType("SELL")}
                    className={`w-1/2 py-2 text-center font-semibold ${orderType === "SELL"
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
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Balance: ₹{userBalance.toLocaleString()}
                </p>
            </div>

            {/* Quantity Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Holdings: {userHolding} units
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
                onClick={handleOrder}
                className={`w-full py-3 font-semibold rounded-md transition ${orderType === "BUY"
                    ? "bg-green-500 text-white hover:bg-green-300"
                    : "bg-red-500 text-white hover:bg-red-300"
                    }`}
            >
                Place order
            </button>
        </div>
    );
};

export default PlaceOrder;
