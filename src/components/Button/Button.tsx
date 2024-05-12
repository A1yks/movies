import { ButtonProps as MantineButtonProps, Button as MantineButton, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';

export type ButtonProps = MantineButtonProps;

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    return <MantineButton ref={ref} radius='md' {...props} />;
});

ButtonComponent.displayName = 'Button';

export const Button = createPolymorphicComponent<'button', ButtonProps>(ButtonComponent);
