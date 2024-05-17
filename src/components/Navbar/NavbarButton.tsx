import { ButtonProps, ElementProps, Button } from '@mantine/core';
import Link from 'next/link';
import styles from './Navbar.module.scss';

export type NavbarButtonProps = {
    active?: boolean;
} & ButtonProps &
    ElementProps<'a', keyof ButtonProps & React.PropsWithChildren>;

export const NavbarButton = ({ children, active, ...others }: NavbarButtonProps) => {
    const activeProps = active ? { c: 'purple', fw: 700, bg: 'purple.2', className: 'selected-link' } : null;

    return (
        <Button
            component={Link}
            href='/'
            variant='subtle'
            justify='start'
            fz={16}
            fw={400}
            px={10}
            h={42}
            styles={{
                root: {
                    transform: 'none',
                    textDecoration: 'none',
                },
            }}
            className={styles.button}
            {...activeProps}
            {...others}
        >
            {children}
        </Button>
    );
};
