'use client';

import { Combobox, Pill, Text, PillsInput, ScrollArea, rem, Input, Center, ComboboxItem } from '@mantine/core';
import { useMultiSelect } from './hooks/useMultiSelect';
import Down from '@images/down.svg';

export type MultiSelectProps = {
    data: ComboboxItem[];
    selectedValues?: ComboboxItem[];
    placeholder?: string;
    searchPlaceholder?: string;
    maxDisplayedValues?: number;
    withSearch?: boolean;
    onSelect?: (value: string, option: ComboboxItem) => void;
};

export function MultiSelect({
    data,
    selectedValues,
    placeholder,
    searchPlaceholder,
    maxDisplayedValues = Infinity,
    withSearch,
    onSelect,
}: MultiSelectProps) {
    const { combobox, search, value, handleOpen, handleClose, handleValueSelect, handleChange, handleKeyDown } = useMultiSelect({
        selectedValues,
        onSelect,
    });

    const values = value.slice(0, maxDisplayedValues === value.length ? maxDisplayedValues : maxDisplayedValues - 1).map((item, i) => (
        <Text key={item.value} lh={rem(20)} fz={rem(14)} style={{ whiteSpace: 'pre-wrap' }}>
            {item.label}
            {i === value.length - 1 ? ' ' : ', '}
        </Text>
    ));

    const options = data
        .filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()))
        .map((item) => {
            const active = value.find((i) => i.value === item.value) !== undefined;

            return (
                <Combobox.Option
                    value={item.value}
                    key={item.value}
                    active={active}
                    bg={active ? 'purple' : undefined}
                    c={active ? '#fff' : undefined}
                >
                    {item.label}
                </Combobox.Option>
            );
        });

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput
                    onClick={handleOpen}
                    pos='relative'
                    styles={{
                        input: {
                            display: 'flex',
                            cursor: 'pointer',
                            paddingLeft: rem(12),
                            paddingRight: rem(34),
                            height: '100%',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Pill.Group gap={0}>
                        {value.length > 0 ? (
                            <>
                                {values}
                                {value.length > maxDisplayedValues && <Pill>+{value.length - (maxDisplayedValues - 1)}</Pill>}
                            </>
                        ) : (
                            <Input.Placeholder>{placeholder}</Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field type='hidden' onKeyDown={handleKeyDown} />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                    <Center
                        data-position='right'
                        className='mantine-Input-section mantine-Select-section'
                        ml='auto'
                        pos='absolute'
                        w={rem(34)}
                        h={rem(34)}
                        style={{ top: 0, right: 0 }}
                    >
                        <Down className={`dropdown-arrow ${combobox.dropdownOpened ? 'dropdown-arrow-opened' : ''}`} />
                    </Center>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                {withSearch && (
                    <Combobox.Search
                        onFocus={handleOpen}
                        onBlur={handleClose}
                        value={search}
                        placeholder={searchPlaceholder}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
                <Combobox.Options>
                    <ScrollArea.Autosize type='scroll'>
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
