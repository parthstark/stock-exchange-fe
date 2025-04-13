export type UserHoldings = Map<string, {
    locked: number;
    available: number;
}>;