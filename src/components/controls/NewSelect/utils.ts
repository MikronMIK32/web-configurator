import { ReactNode, RefObject, cloneElement, isValidElement, useEffect } from 'react';

import { BaseSelectProps, GroupShape, OptionShape } from './types';

export const isGroup = (item: OptionShape | GroupShape): item is GroupShape =>
    Object.prototype.hasOwnProperty.call(item, 'options');

export const isOptionShape = (item: OptionShape | string | null): item is OptionShape =>
    !!item && Object.prototype.hasOwnProperty.call(item, 'key');

export const joinOptions = ({
    selected,
    selectedMultiple,
}: {
    selected?: OptionShape;
    selectedMultiple?: OptionShape[];
}) => {
    const options = selectedMultiple || (selected ? [selected] : []);

    if (!options.length) return null;

    return options.reduce((acc: Array<ReactNode | string>, option: OptionShape, index: number) => {
        if (isValidElement(option.content)) {
            acc.push(cloneElement(option.content, { key: option.key }));
        } else {
            acc.push(option.content || option.key);
        }

        if (index < options.length - 1 && options.length > 1) acc.push(', ');
        return acc;
    }, []);
};

// За один проход делает список пунктов меню плоским и находит выбранные пункты по ключу
export function processOptions(options: BaseSelectProps['options'], selected: BaseSelectProps['selected'] = []) {
    const flatOptions: OptionShape[] = [];
    const unselectedOptions: OptionShape[] = [];

    const selectedArray = Array.isArray(selected) ? selected : [selected];
    const selectedOptions = selectedArray.filter(isOptionShape);
    const selectedKeys = selectedArray.filter((option): option is string => typeof option === 'string');
    const allSelectedKeys = selectedArray
        .map(option => {
            if (typeof option === 'string') return option;
            if (typeof option === 'object' && option && 'key' in option) return option.key;

            return undefined;
        })
        .filter(e => e !== undefined);

    const isSelected = (option: OptionShape) => selectedKeys.includes(option.key);
    const isAllSelected = (option: OptionShape) => allSelectedKeys.includes(option.key);

    const process = (option: OptionShape) => {
        flatOptions.push(option);

        if (isSelected(option)) {
            selectedOptions.push(option);
        }

        if (!isAllSelected(option)) {
            unselectedOptions.push(option);
        }
    };

    options.forEach(option => {
        if (isGroup(option)) {
            option.options.forEach(process);
        } else {
            process(option);
        }
    });

    return { flatOptions, selectedOptions, unselectedOptions };
}

type useVisibleOptionsArgs = {
    /**
     * Количество видимых пунктов
     */
    visibleOptions: number;

    /**
     * Реф на контейнер с пунтами меню
     */
    listRef: RefObject<HTMLElement>;

    /**
     * Реф на контейнер, которому нужно установить высоту
     */
    styleTargetRef?: RefObject<HTMLElement>;

    /**
     * Флаг открытия меню
     */
    open?: boolean;

    /**
     * Позволяет вызвать пересчет высоты
     */
    invalidate?: unknown;
};

export function useVisibleOptions({
    visibleOptions,
    listRef,
    styleTargetRef = listRef,
    open,
    invalidate,
}: useVisibleOptionsArgs) {
    useEffect(() => {
        const list = listRef.current;
        const styleTarget = styleTargetRef.current;

        if (open && list && styleTarget) {
            const optionsNodes = ([] as HTMLElement[]).slice.call(list.children, 0, visibleOptions + 1);

            let height = optionsNodes.slice(0, visibleOptions).reduce((acc, child) => acc + child.clientHeight, 0);

            if (visibleOptions < list.children.length) {
                // Добавляем половинку
                height += Math.ceil(optionsNodes[optionsNodes.length - 1].clientHeight / 2);
            }

            styleTarget.style.height = `${height}px`;
        }
    }, [listRef, open, styleTargetRef, visibleOptions, invalidate]);
}

export const lastIndexOf = <T>(array: T[], predicate: (item: T) => boolean) => {
    // eslint-disable-next-line no-plusplus
    for (let i = array.length - 1; i >= 0; i--) {
        if (predicate(array[i])) return i;
    }
    return -1;
};
