import { Navbar } from '@/components';
import { Group, Box, Title, BoxProps, rem } from '@mantine/core';
import { DrawerMenu } from '../DrawerMenu';

export type PageTitleProps = {
    children: string;
} & Omit<BoxProps, 'children'>;

export function PageTitle({ children, ...others }: PageTitleProps) {
    return (
        <Group {...others}>
            <Box hiddenFrom='sm'>
                <DrawerMenu size={rem(280)}>
                    <Navbar />
                </DrawerMenu>
            </Box>
            <Title>{children}</Title>
        </Group>
    );
}
