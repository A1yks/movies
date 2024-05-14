import { Box, Button, TextInput, TextInputProps, rem } from '@mantine/core';

export type SearchInputProps = {
    onSearch: () => void;
} & TextInputProps;

export function SearchInput({ onSearch, maw, ...others }: SearchInputProps) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearch();
    }

    return (
        <Box component='form' w='100%' maw={maw} onSubmit={handleSubmit}>
            <TextInput
                h={rem(48)}
                w='100%'
                rightSection={
                    <Button h='100%' py={0} type='submit'>
                        Search
                    </Button>
                }
                styles={{
                    section: {
                        padding: rem(8),
                        width: rem(100),
                    },
                    wrapper: {
                        height: '100%',
                    },
                    input: {
                        height: '100%',
                        paddingRight: rem(100),
                    },
                }}
                {...others}
            />
        </Box>
    );
}
