import { ChangeEvent, forwardRef, useCallback, useMemo, useRef, useState } from 'react';

import FormikSelect, {
    BaseSelect,
    BaseSelectProps,
    Arrow as DefaultArrow,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
    OptionShape,
} from '../NewSelect';
import useSelectClear from '../NewSelect/presets/useSelectClear';
import { TagList } from './TagList';
import { SelectWithTagsProps } from './types';
import { filterOptions } from './utils';

export const SimpleSelectWithTags = forwardRef<HTMLDivElement, SelectWithTagsProps>(
    (
        {
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
            Option = DefaultOption,
            Arrow = DefaultArrow,
            value,
            selected,
            size = 'md',
            onOpen,
            onInput,
            onChange,
            options,
            autocomplete = true,
            allowUnselect = true,
            collapseTagList = false,
            moveInputToNewLine = true,
            transformCollapsedTagText,
            transformTagText,
            Tag,
            optionsListProps,
            fieldProps,
            resetOnChange = true,
            resetOnClose= true,
            isLoading = false,
            ...restProps
        },
        ref
    ) => {
        const controlled = Boolean(selected);

        const [selectedTags, setSelectedTags] = useState(selected || []);
        const [isPopoverOpen, setPopoverOpen] = useState<boolean | undefined>(false);
        const updatePopover = useRef<() => any>();

        const resetValue = useCallback(() => {
            const event = { target: { value: '' } };

            onInput(event as ChangeEvent<HTMLInputElement>);
        }, [onInput]);

        const handleUpdatePopover = useCallback(() => {
            if (updatePopover && updatePopover.current) {
                setTimeout(() => {
                    updatePopover.current?.();
                }, 0);
            }
        }, []);

        const handleDeleteTag = useCallback(
            (deletedKey: string) => {
                let tags = selected || selectedTags;

                tags = tags.filter(tag => {
                    const key = typeof tag === 'string' ? tag : tag.key;

                    return deletedKey !== key;
                });

                if (onChange) {
                    onChange({ selectedMultiple: tags });
                }

                if (!controlled) {
                    setSelectedTags(tags);
                }
            },
            [controlled, onChange, selected, selectedTags]
        );

        const handleChange = useCallback<Required<BaseSelectProps>['onChange']>(
            ({ selectedMultiple, name, initiator }) => {
                if (onChange) {
                    onChange({ selectedMultiple, name, initiator });
                }

                if (!controlled) {
                    setSelectedTags(selectedMultiple);
                }

                if (value && resetOnChange) {
                    resetValue();
                }
            },
            [onChange, controlled, value, resetOnChange, resetValue]
        );

        const handleOpen = useCallback<Required<BaseSelectProps>['onOpen']>(
            payload => {
                const { open } = payload;

                if (!open && value && resetOnClose) {
                    resetValue();
                }

                setPopoverOpen(open);

                if (onOpen) onOpen(payload);
            },
            [onOpen, resetValue, value, resetOnClose]
        );

        const filteredOptions = filterOptions(options, value);

        const isAutocomplete = autocomplete;
        const selectedCount = selected ? selected.length : selectedTags.length;
        const isEverythingSelected = options && selectedCount >= options.length;

        const clearableProps = useSelectClear({ Field: TagList });

        return (
            <BaseSelect
                {...restProps}
                ref={ref}
                Option={Option}
                {...clearableProps}
                Optgroup={Optgroup}
                OptionsList={OptionsList}
                Arrow={Arrow}
                multiple
                updatePopover={updatePopover as any}
                allowUnselect={allowUnselect}
                showEmptyOptionsList
                optionsListProps={{
                    emptyPlaceholder: (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {isEverythingSelected ? 'Все элементы выбраны' : null}
                            {!isEverythingSelected ? <p>Ничего не нашлось</p> : null}
                        </div>
                    ),
                    ...optionsListProps,
                }}
                fieldProps={{
                    value,
                    autocomplete: isAutocomplete,
                    onInput,
                    handleDeleteTag,
                    Tag,
                    collapseTagList,
                    moveInputToNewLine,
                    transformCollapsedTagText,
                    transformTagText,
                    handleUpdatePopover,
                    isPopoverOpen,
                    isLoading,
                    ...fieldProps,
                }}
                selected={selected || selectedTags}
                autocomplete={isAutocomplete}
                size={size}
                options={filteredOptions}
                onChange={handleChange}
                onOpen={handleOpen}
                hideSelectedOptions
            />
        );
    }
);

const getValue = (option: string | OptionShape) => (typeof option === 'string' ? option : option.value);

export const SelectWithTags = forwardRef<
    HTMLDivElement,
    Omit<SelectWithTagsProps, 'value' | 'onInput'> & {
        field?: { value: any };
        meta?: any;
        helpers?: { setValue: (value: any) => void };
    }
>(({ name, field, options, meta, helpers, onChange, onBlur, selected, ...props }, ref) => {
    const selectedValues = useMemo(() => {
        // eslint-disable-next-line no-nested-ternary
        const selectedProps = selected ? (Array.isArray(selected) ? selected.map(getValue) : [getValue(selected)]) : [];

        return Array.isArray(field?.value) ? field?.value || [] : selectedProps;
    }, [field?.value, selected]);

    const selectedOptions = useMemo(
        () =>
            options.filter(e => {
                if ('value' in e) {
                    return selectedValues.includes(e.value);
                }
                return false;
            }),
        [options, selectedValues]
    );

    const [value, setValue] = useState('');
    const handleInput = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <SimpleSelectWithTags
            ref={ref}
            name={name}
            options={options}
            {...props}
            value={value}
            onInput={handleInput}
            error={!!meta?.error && meta.touched}
            selected={selectedOptions as any}
            onChange={payload => {
                onChange?.(payload);

                if (!helpers) return;

                helpers.setValue(payload.selectedMultiple.map(e => (typeof e === 'string' ? e : e.value)));
            }}
            onBlur={onBlur}
        />
    );
});

FormikSelect.displayName = 'FormikSelect';

export default SelectWithTags;
