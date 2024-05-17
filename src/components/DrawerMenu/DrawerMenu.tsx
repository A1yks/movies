'use client';

import { Burger, BurgerProps, Drawer, DrawerProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export type DrawerMenuProps = {
    burgerSize?: BurgerProps['size'];
} & Omit<DrawerProps, 'opened' | 'onClose'>;

export function DrawerMenu({ burgerSize, ...others }: React.PropsWithChildren<DrawerMenuProps>) {
    const [opened, { open, close }] = useDisclosure();

    return (
        <>
            <Burger opened={opened} onClick={open} size={burgerSize} />
            <Drawer
                opened={opened}
                onClose={close}
                withCloseButton={false}
                styles={{
                    body: {
                        padding: 0,
                        height: '100%',
                    },
                }}
                {...others}
            />
        </>
    );
}
