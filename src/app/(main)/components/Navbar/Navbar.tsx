import { Stack } from '@mantine/core';
import { NavbarLinks } from './NavbarLinks';
import { Logo } from '@/components';

export function Navbar() {
    return (
        <Stack h='100%' p={24} gap={80} bg='purple.1'>
            <Logo />
            <NavbarLinks />
        </Stack>
    );
}
