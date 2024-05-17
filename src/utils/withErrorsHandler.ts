import { AxiosError } from 'axios';
import { ZodError } from 'zod';

type Callback = (...args: any[]) => unknown;

export function withErrorsHandler<T extends Callback>(callback: T) {
    return (async (...args: Parameters<T>) => {
        try {
            return await callback(...args);
        } catch (err) {
            console.error(err);

            // Errors are thrown to the closest error boundary with custom message

            if (err instanceof AxiosError) {
                if (err.code === 'ECONNREFUSED') {
                    throw new Error('Unable to load data because server is unreachable');
                }
            }

            if (err instanceof ZodError) {
                throw new Error(err.errors[0].path.join('.') + ': ' + err.errors[0].message);
            }

            throw err;
        }
    }) as T;
}
