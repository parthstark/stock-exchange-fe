import { useState } from "react";
import api from "../api/axios";
import { useDemoMode } from "../context/DemoModeContext";

type Method = "GET" | "POST" | "DELETE";

interface UseApiResponse {
    loading: boolean;
    error: string | null;
    request: (url: string, method?: Method, body?: any) => Promise<any>;
}

export function useApi(): UseApiResponse {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { demoMode } = useDemoMode();

    const request = async (url: string, method: Method = "GET", body?: any) => {
        setLoading(true);
        setError(null);

        if (demoMode) {
            return {
                token: 'demo-token',
                tickers: [
                    'TATA',
                    'INFY',
                    'RELIANCE',
                    'HDFC',
                    'ICICI',
                    'TCS',
                    'LT',
                    'HINDUNILVR',
                    'KOTAKBANK',
                    'AXISBANK',
                ]
            }
        }

        try {
            const response = await api.request({
                url,
                method,
                data: body,
            });
            return response?.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, request };
}
