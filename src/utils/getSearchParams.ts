import { headers } from 'next/headers';

export function getSearchParams() {
    const url = new URL(headers().get('x-url')!);
    const searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    return params;
}
