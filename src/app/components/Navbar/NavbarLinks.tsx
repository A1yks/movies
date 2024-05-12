'use client';

import { Stack } from '@mantine/core';
import { NavbarButton } from './NavbarButton';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const routes = [
    {
        href: '/movies',
        label: 'Movies',
    },
    {
        href: '/rated',
        label: 'Rated movies',
    },
];

export const NavbarLinks = () => {
    const pathname = usePathname();
    const [selectedIndex, setSelectedIndex] = useState(() => routes.findIndex((route) => pathname.includes(route.href)));

    return (
        <Stack gap={10}>
            {routes.map((route, i) => (
                <NavbarButton key={route.href} href={route.href} active={i === selectedIndex} onClick={() => setSelectedIndex(i)}>
                    {route.label}
                </NavbarButton>
            ))}
        </Stack>
    );
};
