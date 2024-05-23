import { ErrorPage } from '@/components';
import { AxiosError } from 'axios';
import { notFound } from 'next/navigation';
import { ZodError } from 'zod';

type ServerComponentFn = (...args: any[]) => Promise<JSX.Element> | JSX.Element;

function isNextRedirectError(error: unknown): boolean {
    return (
        error !== null &&
        typeof error === 'object' &&
        'digest' in error &&
        typeof error.digest === 'string' &&
        (error.digest.includes('NEXT_REDIRECT') || error.digest.includes('NEXT_NOT_FOUND'))
    );
}

function parseError(err: unknown): string {
    if (err instanceof AxiosError) {
        if (err.code === 'ECONNREFUSED') {
            return 'Unable to load data because the server is unreachable';
        }

        if (err instanceof AxiosError && err.response?.status === 404) {
            return notFound();
        }
    }

    if (err instanceof ZodError) {
        return err.errors[0].path.join('.') + ': ' + err.errors[0].message;
    }

    if (err instanceof Error) {
        return err.message;
    }

    if (typeof err === 'string') {
        return err;
    }

    return 'Unknown error';
}

export function withErrorCatch<T extends ServerComponentFn>(loadComponent: T) {
    return async (...args: Parameters<T>) => {
        try {
            const serverComponent = await loadComponent(...args);

            return serverComponent;
        } catch (err) {
            // We should check if error.digest contains NEXT_REDIRECT or NEXT_NOT_FOUND as redirect/notFound throws an error
            if (isNextRedirectError(err)) {
                throw err;
            }

            return <ErrorPage error={parseError(err)} />;
        }
    };
}
