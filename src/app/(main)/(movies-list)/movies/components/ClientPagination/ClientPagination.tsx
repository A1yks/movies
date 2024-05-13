'use client';

import { createQueryString } from '@/utils/createQueryString';
import { Pagination } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export type ClientPaginationProps = {
    totalPages: number;
};

export function ClientPagination({ totalPages }: ClientPaginationProps) {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    return (
        <Pagination
            value={page}
            total={totalPages}
            getItemProps={(page) => ({
                component: Link,
                href: `/movies?${createQueryString('page', page.toString(), searchParams.toString())}`,
            })}
        />
    );
}
