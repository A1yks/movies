import { Text } from '@mantine/core';

export function FilterTitle({ children }: React.PropsWithChildren) {
    return (
        <Text fw={700} lh='140%'>
            {children}
        </Text>
    );
}
