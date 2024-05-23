'use client';

import { Combobox, Pill, Text, PillsInput, ScrollArea, rem, Input, Center, ComboboxItem, useMantineTheme } from '@mantine/core';
import { useMultiSelect } from './hooks/useMultiSelect';
import Down from '@images/down.svg';
import { memo } from 'react';

export type MultiSelectProps = {
    id?: string;
    data: ComboboxItem[];
    selectedValues?: ComboboxItem[];
    placeholder?: string;
    maxDisplayedValues?: number;
    onSelect?: (value: string, option: ComboboxItem) => void;
};

function MultiSelectComponent({ id, data, selectedValues, placeholder, maxDisplayedValues = Infinity, onSelect }: MultiSelectProps) {
    const theme = useMantineTheme();
    const selectStyles = theme.components.Select.styles;
    const { combobox, value, handleToggle, handleValueSelect, handleKeyDown } = useMultiSelect({
        selectedValues,
        onSelect,
    });

    const values = value.slice(0, maxDisplayedValues === value.length ? maxDisplayedValues : maxDisplayedValues - 1).map((item, i) => (
        <Text key={item.value} lh={rem(20)} fz={rem(14)} style={{ whiteSpace: 'pre-wrap' }}>
            {item.label}
            {i === value.length - 1 ? ' ' : ', '}
        </Text>
    ));

    const isActive = (index: number) => value.findIndex((item) => item.value === data[index].value) !== -1;

    const options = data.map((item, i, arr) => {
        const active = isActive(i);
        const isTopActive = i > 0 && isActive(i - 1);
        const isBottomActive = i < arr.length - 1 && isActive(i + 1);

        return (
            <Combobox.Option
                value={item.value}
                key={item.value}
                active={active}
                bg={active ? 'purple' : undefined}
                c={active ? '#fff' : undefined}
                style={{
                    borderTopLeftRadius: isTopActive ? 0 : undefined,
                    borderTopRightRadius: isTopActive ? 0 : undefined,
                    borderBottomLeftRadius: isBottomActive ? 0 : undefined,
                    borderBottomRightRadius: isBottomActive ? 0 : undefined,
                }}
            >
                {item.label}
            </Combobox.Option>
        );
    });

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput
                    id={id}
                    onClick={handleToggle}
                    pos='relative'
                    w='100%'
                    styles={{
                        input: {
                            display: 'flex',
                            cursor: 'pointer',
                            paddingLeft: rem(12),
                            paddingRight: rem(34),
                            height: selectStyles.input.height,
                            borderColor: selectStyles.input.borderColor,
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

                        <PillsInput.Field type='hidden' readOnly onKeyDown={handleKeyDown} />
                    </Pill.Group>
                    <Center
                        data-position='right'
                        className='mantine-Input-section mantine-Select-section'
                        ml='auto'
                        pos='absolute'
                        w={selectStyles.section.width}
                        mr={selectStyles.section.marginRight}
                        h='100%'
                        style={{ top: 0, right: 0 }}
                    >
                        <Down className={`dropdown-arrow ${combobox.dropdownOpened ? 'dropdown-arrow-opened' : ''}`} />
                    </Center>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type='scroll'>
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export const MultiSelect = memo(MultiSelectComponent);
