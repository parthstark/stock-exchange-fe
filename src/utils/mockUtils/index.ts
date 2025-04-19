import {
    type CandlestickData,
    type UTCTimestamp
} from "lightweight-charts";

export const generateMockInitialCandles = (count: number, basePrice: number): CandlestickData[] => {
    const candles: CandlestickData[] = [];
    const now = Math.floor(Date.now() / 1000);
    let close = basePrice;

    for (let i = 0; i < count; i++) {
        const time = now - i * 60;
        const open = close;
        const fluctuation = (Math.random() - 0.5) * 4;
        close = parseFloat((open + fluctuation).toFixed(2));
        const high = parseFloat((Math.max(open, close) + Math.random()).toFixed(2));
        const low = parseFloat((Math.min(open, close) - Math.random()).toFixed(2));

        candles.push({
            time: time as UTCTimestamp,
            open,
            high,
            low,
            close,
        });
    }

    return candles.reverse();
};

export const randomDepthArray = (basePrice: number, type: 'ask' | 'bid') => {
    const arr = new Array(15).fill(0).map((_, idx) => {
        const priceFluctuation = Math.random() * 5;
        const price =
            type === 'ask'
                ? basePrice + idx + priceFluctuation
                : basePrice - idx - priceFluctuation;
        return {
            price: parseFloat(price.toFixed(2)),
            volume: parseFloat((Math.random() * 100).toFixed(2)),
        };
    });
    if (type === 'ask') return arr.reverse()
    return arr
}