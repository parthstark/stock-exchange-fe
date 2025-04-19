import TradingChart from "../components/TradingChart";
import OrderBook from "../components/Orderbook";
import PlaceOrder from "../components/PlaceOrder";
import { useParams } from "react-router-dom";

const Market = () => {

    const ticker = useParams()?.ticker?.toUpperCase()

    return (
        <div className="font-sans">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 my-2">
                    <TradingChart ticker={ticker!} />
                </div>

                {/* Divider*/}
                <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

                <div className="w-full md:w-1/4 my-2">
                    <OrderBook ticker={ticker!} />
                </div>

                {/* Divider*/}
                <div className="h-px bg-gray-300 md:h-auto md:w-px mt-4 mb-2 md:my-0" />

                <div className="w-full md:w-1/4 my-2">
                    <PlaceOrder ticker={ticker!} />
                </div>
            </div>
        </div>
    );
};

export default Market;


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