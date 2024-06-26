import Link from 'next/link';
import { Image } from '../Image';
import { Anchor, Group, Text } from '@mantine/core';
import { SITE_NAME } from '@/constants/movies';

export function Logo() {
    return (
        <Anchor component={Link} href='/movies' underline='never'>
            <Group gap={12}>
                <Image src='/images/logo.svg' alt='' width={32} height={32} />
                <Text c='purple' fw={600} fz={24} className='poppins'>
                    {SITE_NAME}
                </Text>
            </Group>
        </Anchor>
    );
}
