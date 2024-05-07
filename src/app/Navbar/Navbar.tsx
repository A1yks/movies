'use client';

import { Stack } from '@mantine/core';
import { NavbarLinks } from './NavbarLinks';
import { Logo } from '@/components/Logo/Logo';

export const Navbar = () => {
    return (
        <Stack h='100%' p={24} gap={80} bg='purple.1'>
            <Logo />
            <NavbarLinks />
        </Stack>
    );
};
