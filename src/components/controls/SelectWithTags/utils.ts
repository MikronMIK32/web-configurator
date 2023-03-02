import { GroupShape, OptionShape, isGroup } from '@controls/NewSelect';

import { OptionMatcher, SelectWithTagsProps } from './types';

const defaultMatch: OptionMatcher = (option, inputValue) =>
    option.key.toLowerCase().indexOf((inputValue || '').toLowerCase(), 0) !== -1;

const optionsIsGroupShapes = (options: SelectWithTagsProps['options']): options is GroupShape[] => {
    const item = options[0];

    if (!item) {
        return false;
    }

    return isGroup(item);
};

export const filterOptions = (options: SelectWithTagsProps['options'], inputValue: string, match = defaultMatch) => {
    if (optionsIsGroupShapes(options)) {
        return options.reduce<GroupShape[]>((acc, group) => {
            const matchedOptions = group.options.filter(option => match(option, inputValue));

            if (matchedOptions.length > 0) {
                acc.push({ ...group, options: matchedOptions });

                return acc;
            }

            return acc;
        }, []);
    }

    return (options as OptionShape[]).filter(option => match(option, inputValue));
};
