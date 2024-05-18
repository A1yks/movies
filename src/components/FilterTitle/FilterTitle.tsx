import { PolymorphicComponentProps, Text, TextProps } from '@mantine/core';

export function FilterTitle<C = 'label'>(props: PolymorphicComponentProps<C, TextProps>) {
    return <Text<any> component='label' fw={700} lh='140%' {...props} />;
}
