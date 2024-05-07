import { Anchor, Group, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
    return (
        <Anchor component={Link} href='/' underline='never'>
            <Group gap={12}>
                <Image src='/images/logo.svg' alt='' width={32} height={32} />
                <Text c='purple' fw={600} fz={24} className='poppins'>
                    ArrowFlicks
                </Text>
            </Group>
        </Anchor>
    );
};
