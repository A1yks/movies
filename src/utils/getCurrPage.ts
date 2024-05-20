import { headers } from 'next/headers';
import { parseNumber } from './parseNumber';

export function getCurrPage() {
    const url = new URL(headers().get('x-url')!);
    const searchParams = url.searchParams;
    const page = parseNumber(searchParams.get('page'), 1);

    return page;
}
