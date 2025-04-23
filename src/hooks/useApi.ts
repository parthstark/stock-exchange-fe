import axios from "axios";
import { useEffect, useState } from "react";
import { useDemoMode } from "../context/DemoModeContext";
import { useUser } from "../context/UserContext";
import { demoResponseData } from "../constants/constants";

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

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const request = async (url: string, method: Method = "GET", body?: any) => {
        if (demoMode) return demoResponseData;

        setLoading(true);
        setError(null);

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
