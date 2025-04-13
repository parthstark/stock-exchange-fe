type Callback = (data: any) => void;
type TickerToStream = string;

class WebSocketManager {
    private ws: WebSocket;
    private activeStreams: Map<TickerToStream, Set<Callback>> = new Map();

    constructor() {
        this.ws = new WebSocket("ws://localhost:8080");

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const stream = data.stream;
            this.activeStreams.get(stream)?.forEach(cb => cb(data));
        };
    }

    subscribe(ticker: string, stream: string, cb: Callback) {
        const tickerToStream = `${ticker}:${stream}`;
        const listenersList = this.activeStreams.get(tickerToStream);

        if (!listenersList) {
            this.activeStreams.set(tickerToStream, new Set([cb]));
            this.ws.send(JSON.stringify({ type: "subscribe", ticker, stream }));
        } else {
            listenersList.add(cb);
        }
    }

    unsubscribe(ticker: string, stream: string, cb: Callback) {
        const tickerToStream = `${ticker}:${stream}`;
        const listenersList = this.activeStreams.get(tickerToStream);
        if (!listenersList) return;

        listenersList.delete(cb);
        if (listenersList.size === 0) {
            this.activeStreams.delete(tickerToStream);
            this.ws.send(JSON.stringify({ type: "unsubscribe", ticker, stream }));
        }
    }
}

const wsManager = new WebSocketManager();
export default wsManager;