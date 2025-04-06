import { useState } from "react";
import api from "../api/axios";

type Method = "GET" | "POST" | "DELETE";

interface UseApiResponse {
    data: any;
    loading: boolean;
    error: string | null;
    request: (url: string, method?: Method, body?: any) => Promise<void>;
}

export function useApi(): UseApiResponse {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = async (url: string, method: Method = "GET", body?: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.request({
                url,
                method,
                data: body,
            });
            setData(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, request };
}
