import TradingChart from "../components/TradingChart";
import OrderBook from "../components/Orderbook";
import PlaceOrder from "../components/PlaceOrder";

const Market = () => {
    return (
        <div className="font-sans">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 my-2">
                    <TradingChart />
                </div>

                {/* Divider*/}
                <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

                <div className="w-full md:w-1/4 my-2">
                    <OrderBook asks={asks} bids={bids} />
                </div>

                {/* Divider*/}
                <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

                <div className="w-full md:w-1/4 my-2">
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
};

export default Market;

const asks = [
    { price: 77900.1, volume: 0.01 },
    { price: 77902.3, volume: 0.02 },
    { price: 77904.6, volume: 0.03 },
    { price: 77906.8, volume: 0.04 },
    { price: 77909.0, volume: 0.05 },
    { price: 77911.2, volume: 0.06 },
    { price: 77913.5, volume: 0.07 },
    { price: 77915.7, volume: 0.08 },
    { price: 77918.0, volume: 0.09 },
    { price: 77920.3, volume: 0.10 },
    { price: 77922.5, volume: 0.11 },
    { price: 77924.8, volume: 0.12 },
    { price: 77927.0, volume: 0.13 },
    { price: 77929.3, volume: 0.14 },
    { price: 77931.5, volume: 0.15 },
    { price: 77933.8, volume: 0.16 },
    { price: 77936.0, volume: 0.17 },
    { price: 77938.3, volume: 0.18 },
    { price: 77940.5, volume: 0.19 },
    { price: 77942.8, volume: 0.20 },
];

const bids = [
    { price: 77899.9, volume: 0.20 },
    { price: 77897.6, volume: 0.19 },
    { price: 77895.4, volume: 0.18 },
    { price: 77893.1, volume: 0.17 },
    { price: 77890.9, volume: 0.16 },
    { price: 77888.6, volume: 0.15 },
    { price: 77886.4, volume: 0.14 },
    { price: 77884.1, volume: 0.13 },
    { price: 77881.9, volume: 0.12 },
    { price: 77879.6, volume: 0.11 },
    { price: 77877.4, volume: 0.10 },
    { price: 77875.1, volume: 0.09 },
    { price: 77872.9, volume: 0.08 },
    { price: 77870.6, volume: 0.07 },
    { price: 77868.4, volume: 0.06 },
    { price: 77866.1, volume: 0.05 },
    { price: 77863.9, volume: 0.04 },
    { price: 77861.6, volume: 0.03 },
    { price: 77859.4, volume: 0.02 },
    { price: 77857.1, volume: 0.01 },
];

// SHIMMER
// <div className="flex flex-col md:flex-row">
//     <div className="w-full md:w-1/2 my-2 animate-pulse">
//         <div className="bg-gray-100 h-160 m-4 rounded-md"></div>
//     </div>

//     Divider
//     <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

//     <div className="w-full md:w-1/4 my-2 animate-pulse">
//         <div className="bg-gray-100 h-160 m-4 rounded-md"></div>
//     </div>

//     Divider
//     <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

//     <div className="w-full md:w-1/4 my-2 animate-pulse">
//         <div className="bg-gray-100 h-160 m-4 rounded-md"></div>
//     </div>
// </div>