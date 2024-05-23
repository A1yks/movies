import { ComboboxItem, ComboboxOptionProps, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';
import { MultiSelectProps } from '../MultiSelect';

type UseMultiSelectConfig = {
    selectedValues?: ComboboxItem[];
    onSelect?: MultiSelectProps['onSelect'];
};

export function useMultiSelect({ selectedValues, onSelect }: UseMultiSelectConfig) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [value, setValue] = useState<ComboboxItem[]>(selectedValues || []);

    useEffect(() => {
        if (selectedValues) {
            setValue(selectedValues);
        }
    }, [selectedValues]);

    const handleValueSelect = (val: string, optionProps: ComboboxOptionProps) => {
        const option = { value: val, label: optionProps.children as string };

        if (!selectedValues) {
            setValue((current) => {
                const hasItem = current.find((item) => item.value === val);

                return hasItem ? current.filter((item) => item.value !== val) : [...current, option];
            });
        }

        onSelect?.(val, option);
    };

    const handleValueRemove = (val: string) => setValue((current) => current.filter((item) => item.value !== val));

    const handleToggle = () => combobox.toggleDropdown();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
            event.preventDefault();

            const option = value[value.length - 1];

            handleValueRemove(option.value);
            onSelect?.(option.value, option);
        }
    };

    return { combobox, value, handleToggle, handleValueSelect, handleKeyDown };
}
