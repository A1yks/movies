'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Box, Group, Pagination } from '@mantine/core';
import { createQueryString } from '@/utils/createQueryString';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import styles from './LinkPagination.module.scss';
import { parseNumber } from '@/utils/parseNumber';

export type PaginationProps = {
    total: number;
};

function LinkPaginationComponent({ total }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = parseNumber(searchParams.get('page'), 1);
    const pages = useMemo(() => Array.from({ length: total }).map((_, i) => i + 1), [total]);

    const getQs = (page: string | number) => createQueryString('page', page.toString(), searchParams.toString());

    const isFirstPage = page === 1;
    const isLastPage = page === pages[pages.length - 1];
    const sliceFrom = Math.max(page - (isLastPage ? 3 : 2), 0);
    const sliceTo = Math.max(page + 1, 3);

    return (
        <Pagination.Root total={total} value={page} boundaries={0}>
            <Group gap='0.5rem'>
                <Pagination.Previous
                    component={isFirstPage ? undefined : Link}
                    href={`${pathname}?page=${page - 1}`}
                    aria-label='Previous page'
                    c={isFirstPage ? 'grey.3' : 'grey.6'}
                    className={styles.control}
                />

                {pages.slice(sliceFrom, sliceTo).map((currPage) => {
                    const active = page === currPage;

                    return (
                        <Pagination.Control
                            key={currPage}
                            bg={active ? 'purple' : undefined}
                            p={0}
                            className={styles.control}
                            style={{ border: active ? 'none' : undefined }}
                        >
                            <Box p='0.5rem' component={Link} td='none' c={active ? 'white' : 'black'} href={`${pathname}?${getQs(currPage)}`}>
                                {currPage}
                            </Box>
                        </Pagination.Control>
                    );
                })}

                <Pagination.Next
                    component={isLastPage ? undefined : Link}
                    href={`${pathname}?page=${page + 1}`}
                    aria-label='Next page'
                    c={isLastPage ? 'grey.3' : 'grey.6'}
                    className={styles.control}
                />
            </Group>
        </Pagination.Root>
    );
}

export const LinkPagination = memo(LinkPaginationComponent);
