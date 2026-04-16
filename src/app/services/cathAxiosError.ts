import axios from 'axios';
import type { RequestError } from '../hooks/useRequest';

export const catchAxiosError = (error: unknown): string => {
    if (!axios.isAxiosError(error)) {
        return 'Error inesperado';
    }

    if (!error.response) {
        return 'Error de red o el servidor no responde';
    }

    const data = error.response.data as RequestError | undefined;

    if (!data) {
        return `Error ${error.response.status}`;
    }

    const msg = data.message;

    if (Array.isArray(msg)) {
        return msg.join('\n');
    }

    if (typeof msg === 'string' && msg.trim() !== '') {
        return msg;
    }

    return `Error: ${data.message ?? error.response.status}`;
};
