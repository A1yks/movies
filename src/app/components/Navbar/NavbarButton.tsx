import { ButtonProps, ElementProps, Button, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

export type NavbarButtonProps = {
    active?: boolean;
} & ButtonProps &
    ElementProps<'a', keyof ButtonProps & React.PropsWithChildren>;

export const NavbarButton = ({ children, active, ...others }: NavbarButtonProps) => {
    const theme = useMantineTheme();
    const activeProps = active ? { c: 'purple', fw: 700, bg: theme.colors.purple[2] } : null;

    return (
        <Button
            component={Link}
            href='/'
            variant='subtle'
            c='black'
            justify='start'
            fz={16}
            fw={400}
            px={10}
            h={42}
            td='none'
            styles={{
                root: {
                    transform: 'none',
                },
            }}
            {...activeProps}
            {...others}
        >
            {children}
        </Button>
    );
};
