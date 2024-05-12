import { headers } from 'next/headers';

export function getCurrPage() {
    const url = new URL(headers().get('x-url')!);
    const searchParams = url.searchParams;
    const page = Number(searchParams.get('page')) || 1;

    return page;
}
