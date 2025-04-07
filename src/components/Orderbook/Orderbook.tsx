interface Order {
    price: number;
    volume: number;
}

interface Props {
    asks: Order[];
    bids: Order[];
}

const OrderBook = ({ asks, bids }: Props) => {
    const maxVolume = Math.max(
        ...asks.map((a) => a.volume),
        ...bids.map((b) => b.volume)
    );

    const totalBidVolume = bids.reduce((acc, cur) => acc + cur.volume, 0);
    const totalAskVolume = asks.reduce((acc, cur) => acc + cur.volume, 0);
    const totalVolume = totalBidVolume + totalAskVolume;

    const bidPercentage = ((totalBidVolume / totalVolume) * 100).toFixed(0);
    const askPercentage = ((totalAskVolume / totalVolume) * 100).toFixed(0);

    return (
        <div className="p-4 space-y-2 text-sm text-gray-800">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Orderbook</h2>

            {/* Header Row */}
            <div className="flex justify-between font-semibold text-gray-500 text-xs">
                <div className="text-left" >Price</div>
                <div className="text-right">Volume</div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200" />

            {/* Asks */}
            {asks.map((ask, i) => {
                if (i >= 10) return null; // Limit to 10 asks
                const width = (ask.volume / maxVolume) * 100;

                return (
                    <div
                        key={`ask-${i}`}
                        className="relative grid grid-cols-2 items-center text-red-500 text-xs"
                    >
                        <div className="z-10">{ask.price.toFixed(1)}</div>
                        <div className="text-right z-10">{ask.volume.toFixed(5)}</div>
                        <div
                            className="absolute right-0 top-0 h-full bg-red-100"
                            style={{ width: `${width}%` }}
                        />
                    </div>
                );
            })}

            {/* Mid Price */}
            <div className="text-center font-semibold text-green-600 py-1 text-sm">77,900.6</div>

            {/* Bids */}
            {bids.map((bid, i) => {
                if (i >= 10) return null; // Limit to 10 bids
                const width = (bid.volume / maxVolume) * 100;

                return (
                    <div
                        key={`bid-${i}`}
                        className="relative grid grid-cols-2 items-center text-green-600 text-xs"
                    >
                        <div className="z-10">{bid.price.toFixed(1)}</div>
                        <div className="text-right z-10">{bid.volume.toFixed(5)}</div>
                        <div
                            className="absolute left-0 top-0 h-full bg-green-100"
                            style={{ width: `${width}%` }}
                        />
                    </div>
                );
            })}

            {/* Divider */}
            <div className="h-px bg-gray-200 my-4" />

            <div className="flex items-center w-full h-6">
                <div
                    className="bg-green-100 text-green-600 text-xs font-medium h-full flex items-center justify-start px-2"
                    style={{ width: `${bidPercentage}%` }}
                >
                    {bidPercentage}%
                </div>

                <div
                    className="bg-red-100 text-red-500 text-xs font-medium h-full flex items-center justify-end px-2"
                    style={{ width: `${askPercentage}%` }}
                >
                    {askPercentage}%
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
