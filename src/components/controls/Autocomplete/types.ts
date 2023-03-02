import { ChangeEvent, FC, ReactNode, RefAttributes } from 'react';

import type { BaseSelectProps, FieldProps } from '@controls/NewSelect/types';

import type { FormControlProps } from '../FormControl/types';
import type { InputProps } from '../Input/types';
import type { SelectWithTagsProps } from '../SelectWithTags/types';

export type AutocompleteProps = Omit<BaseSelectProps, 'Field' | 'nativeSelect'> &
  Pick<
    SelectWithTagsProps,
    'collapseTagList' | 'moveInputToNewLine' | 'transformCollapsedTagText' | 'transformTagText'
  > & {
    /**
     * Компонент ввода значения
     */
    Input?: FC<InputProps & RefAttributes<HTMLInputElement>>;

    /**
     * Пропсы, которые будут прокинуты в инпут
     */
    inputProps?: InputProps & Record<string, unknown>;

    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Поле доступно только для чтения
     */
    readOnly?: InputProps['readOnly'];

    /**
     * Обработчик ввода
     */
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Хранит функцию, с помощью которой можно обновить положение поповера
     */
    updatePopover?: BaseSelectProps['updatePopover'];

    /** Включить нижние теги */
    withTags?: boolean;

    /**
     * В состоянии без фокуса показывает по формуле {placeholderSelected} {selectedCount}
     */
    placeholderSelected?: string;
  };

export type AutocompleteFieldProps = FieldProps &
  Pick<AutocompleteProps, 'Input' | 'inputProps' | 'value' | 'onInput' | 'readOnly'> & {
    name?: string;
    bottomAddons?: ReactNode;
    size?: FormControlProps['size'];
  };
