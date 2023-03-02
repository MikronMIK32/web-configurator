import type { ChangeEvent, FC, ReactNode } from 'react';

import type { BaseSelectProps, OptionShape } from '@controls/NewSelect';
import type { TagProps } from '@controls/Tags/Tag';

export type OptionMatcher = (option: OptionShape, inputValue: string) => boolean;

export type TagComponent = FC<TagProps>;

export interface SelectWithTagsProps extends Omit<BaseSelectProps, 'multiple'> {
    /**
     * Значение поля ввода
     */
    value: string;

    isLoading?: boolean;
    resetOnChange?: boolean;
    resetOnClose?: boolean;

    /**
     * Обработчик ввода
     */
    onInput: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Список выбранных пунктов (controlled-селект)
     */
    selected?: Array<OptionShape | string>;

    /**
     * Обработчик выбора
     */
    onChange?: (payload: {
        selectedMultiple: Array<OptionShape | string>;
        initiator?: OptionShape | null;
        name?: string;
    }) => void;

    /**
     * Режим автокомплита
     */
    autocomplete?: boolean;

    /**
     * Компонент Тэг
     */
    Tag?: TagComponent;

    /**
     * Показывать тэги только в одном ряду, а если не помещаются в один ряд - схлопнуть в одну кнопку
     */
    collapseTagList?: boolean;

    /**
     * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
     */
    moveInputToNewLine?: boolean;

    /**
     * Трансформировать текст компонента Тэг который отображает общее количество выбранных элементов
     */
    transformCollapsedTagText?: (collapsedCount: number) => string;

    /**
     * Трансформировать текст компонента Тэг
     */
    transformTagText?: (tagText?: ReactNode) => ReactNode;
}
