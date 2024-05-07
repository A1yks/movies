import { Stack } from '@mantine/core';
import { NavbarButton } from './NavbarButton';
import { usePathname } from 'next/navigation';

const routes = [
    {
        href: '/',
        label: 'Movies',
    },
    {
        href: '/rated',
        label: 'Rated movies',
    },
];

export const NavbarLinks = () => {
    const pathname = usePathname();

    return (
        <Stack gap={10}>
            {routes.map((route) => (
                <NavbarButton key={route.href} href={route.href} active={pathname === route.href}>
                    {route.label}
                </NavbarButton>
            ))}
        </Stack>
    );
};
