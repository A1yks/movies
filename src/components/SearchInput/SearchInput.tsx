import { Box, Button, TextInput, TextInputProps, rem } from '@mantine/core';
import Image from 'next/image';
import searchImg from '@images/search.svg?url';
import styles from './SearchInput.module.scss';

export type SearchInputProps = {
    onSearch: () => void;
    searchBtnText?: string;
} & TextInputProps;

export function SearchInput({ onSearch, searchBtnText = 'Search', maw, ...others }: SearchInputProps) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch();
    }

    return (
        <Box component='form' w='100%' maw={maw} onSubmit={handleSubmit}>
            <TextInput
                h={rem(48)}
                w='100%'
                leftSection={<Image src={searchImg} alt='' />}
                rightSection={
                    <Button h='100%' w={rem(88)} type='submit'>
                        {searchBtnText}
                    </Button>
                }
                styles={{
                    section: {
                        padding: rem(8),
                        '--input-right-section-size': rem(104),
                        '--input-left-section-size': rem(40),
                    },
                    wrapper: {
                        height: '100%',
                    },
                    input: {
                        height: '100%',
                        paddingRight: rem(104),
                        paddingLeft: rem(40),
                    },
                }}
                classNames={{ input: styles.input }}
                {...others}
            />
        </Box>
    );
}
