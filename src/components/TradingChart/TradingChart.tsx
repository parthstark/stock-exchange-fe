import { useEffect, useRef } from "react";
import {
    createChart,
    CandlestickSeries,
    type IChartApi,
    type CandlestickData,
    type DeepPartial,
    type ChartOptions,
} from "lightweight-charts";

const TradingChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
            chartRef.current.resize(
                chartContainerRef.current.clientWidth,
                chartContainerRef.current.clientHeight
            );
        }
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;

        chartRef.current = createChart(chartContainerRef.current, {
            ...chartOptions,
        });

        const candleSeries = chartRef.current.addSeries(CandlestickSeries, {
            upColor: "#4fff00",
            downColor: "#ff0000",
            borderUpColor: "#4fff00",
            borderDownColor: "#ff0000",
            wickUpColor: "#4fff00",
            wickDownColor: "#ff0000",
        })
        candleSeries.setData(exampleData);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-full p-4">
            <h2 className="text-xl font-bold text-gray-800">Chart</h2>
            <div ref={chartContainerRef} className="w-full h-[300px] md:h-[600px] py-6" />
        </div>
    );
};

export default TradingChart;

const chartOptions: DeepPartial<ChartOptions> = {
    layout: {
        background: { color: "#fff" },
        textColor: "#333",
    },
    grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
    },
    crosshair: {
        mode: 1,
    },
    rightPriceScale: {
        borderColor: "#ccc",
    },
    timeScale: {
        borderColor: "#ccc",
        timeVisible: true,
        secondsVisible: false,
    },
};

const exampleData: CandlestickData[] = [
    { time: "2024-04-01", open: 100, high: 110, low: 90, close: 105 },
    { time: "2024-04-02", open: 105, high: 115, low: 95, close: 108 },
    { time: "2024-04-03", open: 108, high: 112, low: 102, close: 107 },
    { time: "2024-04-04", open: 107, high: 109, low: 100, close: 103 },
    { time: "2024-04-05", open: 103, high: 106, low: 101, close: 104 },
    { time: "2024-04-06", open: 104, high: 110, low: 103, close: 109 },
    { time: "2024-04-07", open: 109, high: 112, low: 105, close: 106 },
    { time: "2024-04-08", open: 106, high: 108, low: 100, close: 101 },
    { time: "2024-04-09", open: 101, high: 105, low: 98, close: 100 },
    { time: "2024-04-10", open: 100, high: 102, low: 96, close: 98 },
    { time: "2024-04-11", open: 98, high: 99, low: 92, close: 94 },
    { time: "2024-04-12", open: 94, high: 97, low: 90, close: 92 },
    { time: "2024-04-13", open: 92, high: 95, low: 89, close: 91 },
    { time: "2024-04-14", open: 91, high: 96, low: 90, close: 95 },
    { time: "2024-04-15", open: 95, high: 97, low: 94, close: 96 },
    { time: "2024-04-16", open: 96, high: 100, low: 95, close: 99 },
    { time: "2024-04-17", open: 99, high: 104, low: 97, close: 102 },
    { time: "2024-04-18", open: 102, high: 106, low: 101, close: 104 },
    { time: "2024-04-19", open: 104, high: 108, low: 102, close: 107 },
    { time: "2024-04-20", open: 107, high: 110, low: 105, close: 108 },
];
