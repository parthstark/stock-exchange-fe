import axios from "axios";
import { useState } from "react";
import { useDemoMode } from "../context/DemoModeContext";
import { useUser } from "../context/UserContext";

type Method = "GET" | "POST" | "DELETE";

interface UseApiResponse {
    loading: boolean;
    error: string | null;
    request: (url: string, method?: Method, body?: any) => Promise<any>;
}

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
});

export function useApi(): UseApiResponse {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { demoMode } = useDemoMode();
    const { state: { token } } = useUser();

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
                headers: {
                    'Authorization': token
                }
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
