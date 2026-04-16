import { useState } from 'react';

type RequestError = {
    message: string;
    code?: string;
};

export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<RequestError | null>(null);

    const makeRequest = async <T>(request: () => Promise<T>): Promise<T | null> => {
        setLoading(true);
        setError(null);
        try {
            const result = await request();
            return result;
        } catch (err) {
            if (err instanceof Error) {
                const formattedError: RequestError = {
                    message: err?.message || 'Error inesperado',
                };
                setError(formattedError);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, makeRequest };
};
