import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import {
  BaseSelect,
  BaseSelectChangePayload,
  Optgroup as DefaultOptgroup,
  Option as DefaultOption,
  OptionsList as DefaultOptionsList,
  GroupShape,
  OptionShape,
} from '@controls/NewSelect';
import { Arrow as DefaultArrow } from '@controls/NewSelect/components/arrow';

import { colors } from '@scripts/colors';

import { InputProps } from '../Input';
import { TagList } from '../SelectWithTags/TagList';
import AutocompleteField from './AutocompleteField';
import Clear from './Clear';
import { AutocompleteProps } from './types';

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      Arrow = DefaultArrow,
      OptionsList = DefaultOptionsList,
      Optgroup = DefaultOptgroup,
      Option = DefaultOption,
      Input,
      inputProps = {},
      onInput,
      value,
      readOnly,
      multiple,
      closeOnSelect = !multiple,
      options = [],
      fieldProps,
      ...restProps
    },
    ref
  ) => {
    const props = useMemo(
      () => ({
        ref,
        autocomplete: true,
        options,
        closeOnSelect,
        Option,
        Arrow,
        multiple,
        Field: multiple ? TagList : AutocompleteField,
        fieldProps: {
          Input,
          onInput,
          value,
          inputProps,
          readOnly,
          ...fieldProps,
        },
        Optgroup,
        OptionsList,
        ...restProps,
      }),
      [
        multiple,
        Arrow,
        Input,
        Optgroup,
        Option,
        OptionsList,
        closeOnSelect,
        fieldProps,
        inputProps,
        onInput,
        options,
        readOnly,
        ref,
        restProps,
        value,
      ]
    );

    return <BaseSelect emitChangeOnClick {...props} />;
  }
);

Autocomplete.displayName = 'Autocomplete';

interface useAutocompleteProps extends Pick<AutocompleteProps, 'options'> {
  initialSelectedValues: any[];
  reinitialize?: boolean;
  multiple: boolean;
  showSelected?: boolean;
}

export const useAutocomplete = ({
  initialSelectedValues,
  reinitialize = true,
  multiple,
  options,
  showSelected = true,
}: useAutocompleteProps) => {
  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const selectedOptions = useMemo(
    () =>
      options.filter(e => {
        if ('value' in e) return selectedValues.includes(e.value);
        return false;
      }) as OptionShape[],
    [options, selectedValues]
  );
  const [search, setSearch] = useState('');

  const getKeyByValue = useCallback(
    (value: any) => {
      const result = options.find(e => {
        if ('value' in e) return e.value === value;
        return false;
      });

      if (!result || !('key' in result)) return null;

      return result.key;
    },
    [options]
  );

  useEffect(() => {
    if (!reinitialize) return;

    if (!multiple && initialSelectedValues.length > 0) {
      const key = getKeyByValue(initialSelectedValues[0]);
      if (key !== null) {
        setSearch(key);
      }
    }

    setSelectedValues(initialSelectedValues);
  }, [getKeyByValue, initialSelectedValues, multiple, reinitialize]);

  const matchOption = useCallback((option: GroupShape | OptionShape, inputValue: string) => {
    if (!inputValue) return true;

    if ('key' in option) {
      return option.key.toLowerCase().includes(inputValue.toLowerCase());
    }

    if ('label' in option) {
      return option.label?.toLowerCase().includes(inputValue.toLowerCase());
    }

    return false;
  }, []);

  const [isDirtySearch, setDirtySearch] = useState(false);

  const handleInput = useCallback<Exclude<InputProps['onChange'], undefined>>((_, payload) => {
    setSearch(payload.value);
    setDirtySearch(!!payload.value.length);
  }, []);

  const handleChange = ({ selected }: BaseSelectChangePayload) => {
    if (multiple) {
      setSearch('');
    } else {
      setSearch(selected ? selected.key : '');
    }

    if (selected && !selectedValues.includes(selected.value)) {
      setSelectedValues(selectedValues.concat([selected.value]));
    }
  };

  const filteredOptions = useMemo(
    () =>
      !isDirtySearch
        ? options
        : options.filter(option => {
            if (!('value' in option)) return false;
            const isSelected = selectedValues.includes(option.value);
            const isMatched = matchOption(option, search);

            return (!isSelected || showSelected) && isMatched;
          }),
    [isDirtySearch, options, selectedValues, matchOption, search, showSelected]
  );

  const onClose = useCallback(() => {
    setDirtySearch(false);

    if (!multiple) {
      setSearch(selectedOptions?.[0]?.key || '');
    } else {
      setSearch('');
    }
  }, [multiple, selectedOptions]);

  return {
    value: search,
    setValue: setSearch,
    filteredOptions,
    handleInput,
    selectedValues,
    handleChange,
    matchOption,
    selectedOptions,
    onClose,
  };
};

const FormikAutocomplete = forwardRef<
  HTMLInputElement,
  AutocompleteProps & {
    field?: { value: any };
    meta?: any;
    helpers?: { setValue: (value: any) => void };
  }
>(
  (
    {
      multiple = false,
      meta,
      field,
      helpers,
      onOpen,
      onChange,
      onInput,
      onBlur,
      options,
      fieldProps,
      withTags = multiple,
      placeholderSelected,
      collapseTagList = false,
      moveInputToNewLine = true,
      transformCollapsedTagText,
      transformTagText,
      ...props
    },
    ref
  ) => {
    const initialSelectedValues = useMemo(() => {
      if (multiple) return (Array.isArray(field?.value) ? field?.value : []) || [];

      return field?.value === null ? [] : [field?.value];
    }, [field?.value, multiple]);

    const { value, setValue, handleInput, onClose, handleChange, selectedOptions, filteredOptions } = useAutocomplete({
      multiple,
      options,
      initialSelectedValues,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    const selectedCount = selectedOptions.length;
    const hasValue = !!value;

    const showSelectedPlaceholder = !!placeholderSelected && !hasValue && selectedCount > 0;

    const isOpenRef = useRef(false);

    const hasSelected = selectedCount > 0;
    let canClear;

    if (!multiple) {
      canClear = hasValue;
    } else {
      canClear = hasValue || hasSelected;
    }

    const isEverythingSelected = options && selectedCount >= options.length;

    const [isPopoverOpen, setPopoverOpen] = useState<boolean | undefined>(false);

    const handleDeleteTag = useCallback(
      (deletedKey: string) => {
        const tags = selectedOptions.filter(tag => {
          const key = typeof tag === 'string' ? tag : tag.key;

          return deletedKey !== key;
        });

        if (onChange) {
          onChange({ selectedMultiple: tags, initiator: null, selected: tags?.[0] || null });
        }

        helpers?.setValue(tags.map(e => e.value));
      },
      [onChange, selectedOptions, helpers]
    );

    return (
      <Autocomplete
        ref={ref}
        {...(withTags && {
          hideSelectedOptions: true,
          showEmptyOptionsList: true,
        })}
        options={filteredOptions}
        {...props}
        value={value}
        selected={selectedOptions}
        onOpen={payload => {
          setPopoverOpen(payload.open);

          onOpen?.(payload);
          if (typeof payload.open === 'boolean') {
            isOpenRef.current = payload.open;
          }

          if (!payload.open) {
            onClose();
          }
        }}
        onInput={e => {
          handleInput(e, {
            value: e.currentTarget.value,
          });

          onInput?.(e);

          if (!multiple && !e.currentTarget.value) {
            helpers?.setValue(null);
          }
        }}
        onChange={payload => {
          handleChange(payload);

          setTimeout(() => {
            if (!helpers) return;

            if (!multiple) {
              helpers.setValue(payload.selected?.value);
            } else {
              helpers.setValue(payload.selectedMultiple.map(e => e.value));
            }
          }, 1);

          onChange?.(payload);
        }}
        allowUnselect={multiple}
        multiple={multiple}
        onBlur={onBlur}
        inputProps={{
          ref: mergeRefs([inputRef /* props.inputProps!.ref */]),
          placeholder: props.placeholder,
          ...(showSelectedPlaceholder && {
            placeholder: `${placeholderSelected} ${selectedCount}`,
          }),
        }}
        fieldCSS={{
          ...(showSelectedPlaceholder && {
            'input::placeholder': {
              transition: 'color .2s ease',
              willChange: 'color',
            },
            'input:not(:focus)::placeholder': {
              color: colors.black,
            },
          }),
        }}
        fieldProps={{
          error: meta?.error,
          ...(withTags && {
            handleDeleteTag,
            collapseTagList,
            moveInputToNewLine,
            transformCollapsedTagText,
            transformTagText,
            value,
            autocomplete: true,
            isPopoverOpen,
          }),
          rightAddons: (
            <Clear
              visible={canClear}
              clear={() => {
                setValue('');
                if (!helpers) return;

                if (!multiple) {
                  helpers.setValue(null);
                } else {
                  helpers.setValue([]);
                }
              }}
              focus={() => {
                if (isOpenRef.current) {
                  inputRef.current?.focus();
                } else {
                  inputRef.current?.blur();
                }
              }}
              css={{ marginLeft: 'auto' }}
            />
          ),
          ...fieldProps,
        }}
        optionsListProps={{
          emptyPlaceholder: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {isEverythingSelected ? 'Все элементы выбраны' : null}
              {!isEverythingSelected && hasValue ? <p>Ничего не нашлось</p> : null}
              {!isEverythingSelected && !hasValue ? <p>Начинайте вводить</p> : null}
            </div>
          ),
        }}
      />
    );
  }
);

FormikAutocomplete.displayName = 'FormikAutocomplete';

export default FormikAutocomplete;
