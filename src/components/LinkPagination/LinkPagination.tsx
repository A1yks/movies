'use client';

import { useSearchParams } from 'next/navigation';
import { Pagination } from '@mantine/core';
import { createQueryString } from '@/utils/createQueryString';
import Link from 'next/link';
import { memo } from 'react';

export type PaginationProps = {
    total: number;
    pathname?: string;
};

function LinkPaginationComponent({ total, pathname = '' }: PaginationProps) {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);

    const getQs = (page: string | number) => createQueryString('page', page.toString(), searchParams.toString());

    return (
        <Pagination
            total={total}
            value={page}
            getItemProps={(page) => ({
                component: Link,
                href: `${pathname}?${getQs(page)}`,
                className: 'no-underline',
            })}
            getControlProps={(control) => {
                if (control === 'next') {
                    return {
                        component: Link,
                        href: `${pathname}?${getQs(page + 1)}`,
                        className: 'no-underline',
                    };
                }

                if (control === 'previous') {
                    return {
                        component: Link,
                        href: `${pathname}?${getQs(page - 1)}`,
                        className: 'no-underline',
                    };
                }

                return {};
            }}
        />
    );
}

export const LinkPagination = memo(LinkPaginationComponent);
