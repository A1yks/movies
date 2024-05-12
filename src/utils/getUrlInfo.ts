import { headers } from 'next/headers';

export function getUrlInfo() {
    const url = headers().get('x-url') as string;
    const splitted = url.split('?');
    const pathname = splitted[0];
    const qs = splitted[1] || '';

    return { url, pathname, qs };
}
