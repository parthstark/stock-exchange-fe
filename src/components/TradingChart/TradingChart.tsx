import { useEffect, useRef, useState } from "react";
import {
    createChart,
    CandlestickSeries,
    type IChartApi,
    type CandlestickData,
    type DeepPartial,
    type ChartOptions,
    type CandlestickStyleOptions,
    type ISeriesApi,
    type UTCTimestamp,
} from "lightweight-charts";
import { useMarketData } from "../../context/MarketDataContext";
import { useDemoMode } from "../../context/DemoModeContext";
import { useApi } from "../../hooks/useApi";
import { generateMockInitialCandles } from "../../utils/mockUtils";

interface TradingChartProps {
    ticker: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ ticker }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [candleSeries, setCandleSeries] = useState<ISeriesApi<any> | null>(null);
    const { state: { tickers } } = useMarketData()
    const { demoMode } = useDemoMode()
    const { request } = useApi();
    const basePrice = tickers.find((entry) => entry.ticker === ticker)?.price ?? 0

    useEffect(() => {
        if (!chartContainerRef.current) return;
        chartRef.current = createChart(chartContainerRef.current, {
            ...chartOptions,
        });
        window.addEventListener("resize", handleResize);

        const candleSeries = chartRef.current?.addSeries(CandlestickSeries, candlestickSeriesOptions)
        setCandleSeries(candleSeries)

        return () => {
            window.removeEventListener("resize", handleResize);
            chartRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        if (!candleSeries) return;

        setChartData();
        const newCandleInterval = setInterval(() => {
            const newCandle = generateNextCandle(candleSeries?.data() as CandlestickData[]);
            candleSeries?.update(newCandle);
        }, 60 * 1000);

        return () => clearInterval(newCandleInterval);
    }, [candleSeries])

    // for demo mode only
    useEffect(() => {
        if (!demoMode) return
        if (!candleSeries) return;

        const currentCandleInterval = setInterval(() => {
            const lastCandle = candleSeries?.data()[candleSeries.data().length - 1] as CandlestickData
            const priceFluctuation = Math.random() * 2;
            const newClose = parseFloat((basePrice + priceFluctuation).toFixed(2));

            lastCandle.close = newClose;
            lastCandle.high = Math.max(lastCandle.high, newClose);
            lastCandle.low = Math.min(lastCandle.low, newClose);
            candleSeries?.update({ ...lastCandle });
        }, 500)

        return () => clearInterval(currentCandleInterval);
    }, [candleSeries, demoMode])

    const setChartData = async () => {
        const response = await request(`/v1/market/klines/${ticker}`);
        let initialCandles = response?.klines
        if (demoMode) initialCandles = generateMockInitialCandles(150, basePrice)
        candleSeries?.setData(initialCandles);
    }

    const generateNextCandle = (candleSeriesData: CandlestickData[]): CandlestickData => {
        const now = Math.floor(Date.now() / 1000) as UTCTimestamp
        const lastCandle = candleSeriesData[candleSeriesData.length - 1]
        return {
            time: now,
            open: lastCandle.close,
            high: lastCandle.close,
            low: lastCandle.close,
            close: lastCandle.close,
        };
    };

    const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
            chartRef.current.resize(
                chartContainerRef.current.clientWidth,
                chartContainerRef.current.clientHeight
            );
        }
    };

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

const candlestickSeriesOptions: DeepPartial<CandlestickStyleOptions> = {
    upColor: "#4fff00",
    downColor: "#ff0000",
    borderUpColor: "#4fff00",
    borderDownColor: "#ff0000",
    wickUpColor: "#4fff00",
    wickDownColor: "#ff0000",
}