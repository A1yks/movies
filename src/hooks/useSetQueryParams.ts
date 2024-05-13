import { createQueryString } from '@/utils/createQueryString';
import { useDebouncedCallback } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';

export type UseSetQueryParamsOptions = {
    debounce?: number | false;
    /**
     * Modifies query string before navigation
     * @param qs Query string
     * @returns Modified query string
     */
    beforeChange?: (qs: string) => string;
};

export function useSetQueryParams({ debounce = 300, beforeChange }: UseSetQueryParamsOptions = {}) {
    const pathname = usePathname();
    const router = useRouter();

    function setQueryParams(nameOrQs: string, value?: string) {
        let queryString = value === undefined ? nameOrQs : createQueryString(nameOrQs, value);

        if (beforeChange !== undefined) {
            queryString = beforeChange(queryString);
        }

        router.push(pathname + '?' + queryString, { scroll: false });
    }

    const debounced = useDebouncedCallback(setQueryParams, typeof debounce === 'number' ? debounce : 500);

    return !debounce ? setQueryParams : debounced;
}
