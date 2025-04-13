import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

type PricePoint = {
    price: number;
    volume: number;
}

type Depth = {
    asks: PricePoint[];
    bids: PricePoint[];
}

interface OrderBookProps {
    ticker: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ ticker }) => {
    const { request, loading, error } = useApi();

    const [depth, setDepth] = useState<Depth>({
        asks: [],
        bids: []
    })

    useEffect(() => {
        fetchDepth()
    }, [])

    const fetchDepth = async () => {
        const { asks, bids } = await request(`/v1/market/depth/${ticker}`);
        setDepth({
            asks: asks ?? [],
            bids: bids ?? []
        })
    };

    if (error) return null

    const maxAskVolume = Math.max(
        ...depth.asks.map((a) => a.volume)
    );
    const maxBidVolume = Math.max(
        ...depth.bids.map((b) => b.volume)
    );

    const totalBidVolume = depth.bids.reduce((acc, cur) => acc + cur.volume, 0);
    const totalAskVolume = depth.asks.reduce((acc, cur) => acc + cur.volume, 0);
    const totalVolume = totalBidVolume + totalAskVolume;

    const bidPercentage = (totalBidVolume / totalVolume) * 100
    const askPercentage = (totalAskVolume / totalVolume) * 100
    const bidPercentageText = isNaN(bidPercentage) ? 50 : bidPercentage.toFixed(0)
    const askPercentageText = isNaN(askPercentage) ? 50 : askPercentage.toFixed(0)

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
            {loading && <div>
                {[...Array(10)].map((_, idx) => (
                    <div
                        key={idx}
                        className="p-1 my-2 h-4 bg-red-50 animate-pulse"
                        style={{ width: `${idx * 10}%` }}
                    />
                ))}
            </div>
            }
            {!loading && depth.asks.slice(-10).map((ask, i) => {
                const width = (ask.volume / maxAskVolume) * 100;
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

            {/* Mid Price
            <div className="text-center font-semibold text-green-600 py-1 text-sm">77,900.6</div> */}

            {/* Bids */}
            {loading && <div>
                {[...Array(10)].map((_, idx) => (
                    <div
                        key={idx}
                        className="p-1 my-2 h-4 bg-green-50 animate-pulse"
                        style={{ width: `${(9 - idx) * 10}%` }}
                    />
                ))}
            </div>
            }
            {!loading && depth.bids.slice(0, 10).map((bid, i) => {
                const width = (bid.volume / maxBidVolume) * 100;
                return (
                    <div
                        key={`bid-${i}`}
                        className="relative grid grid-cols-2 items-center text-green-600 text-xs"
                    >
                        <div className="z-10">{bid.price.toFixed(1)}</div>
                        <div className="text-right z-10">{bid.volume.toFixed(5)}</div>
                        <div
                            className="absolute right-0 top-0 h-full bg-green-100"
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
                    style={{ width: `${bidPercentageText}%` }}
                >
                    {bidPercentageText}%
                </div>

                <div
                    className="bg-red-100 text-red-500 text-xs font-medium h-full flex items-center justify-end px-2"
                    style={{ width: `${askPercentageText}%` }}
                >
                    {askPercentageText}%
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
