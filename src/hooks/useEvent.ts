import { useRef, useCallback, useLayoutEffect } from 'react';

type CallbackType = (...args: any[]) => unknown;

export function useEvent<T extends CallbackType>(handler: T) {
    const handlerRef = useRef<T | null>(null);

    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args: any[]) => {
        return handlerRef.current?.(...args);
    }, []) as T;
}
