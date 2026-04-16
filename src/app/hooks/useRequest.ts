import { useState } from "react";

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const makeRequest = async <T>(request: () => Promise<T>): Promise<T | null> => {
        setLoading(true);
        setError(null);
        try {
            const result = await request();
            return result;
        } catch (err) {
            setError('An error occurred while fetching data.');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, makeRequest };
}