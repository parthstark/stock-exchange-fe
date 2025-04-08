export type OrderSide = 'buy' | 'sell';
export type OrderAction = 'create' | 'update' | 'delete' | 'ramp';

export interface Order {
    action: OrderAction;
    orderId: string;
    side: OrderSide;
    ticker: string;
    quantity: number;
    limitPrice: number;
}

// export interface FilledOrder {
//     quantity: number;
//     price: number;
//     timestamp: string;
// }

// export interface OrderResponse {
//     orderId: string;
//     status: OrderStatus;
//     message?: string;
//     fills?: FilledOrder[];
// }