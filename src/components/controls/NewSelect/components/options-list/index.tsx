import { forwardRef, useCallback, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { colors } from '@scripts/colors';

import { scale } from '@scripts/helpers';
import { GroupShape, OptionShape, OptionsListProps } from '../../types';
import { isGroup, useVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';
import { useSelectTheme } from '../../context';

const createCounter = () => {
  let count = 0;
  // eslint-disable-next-line no-plusplus
  return () => count++;
};

export const OptionsList = forwardRef(
  (
    {
      className,
      optionGroupClassName,
      Option,
      getOptionProps,
      options = [],
      Optgroup = DefaultOptgroup,
      emptyPlaceholder,
      visibleOptions = 4,
      onScroll,
      open,
      header,
      footer,
    }: OptionsListProps,
    ref,
  ) => {
    // const { getSelectStyles } = useStyles({ size, theme, variant });

    const renderOption = useCallback(
      (option: OptionShape, index: number) => (
        <Option key={option.key} {...getOptionProps(option, index)} />
      ),
      [Option, getOptionProps],
    );

    const listRef = useRef<HTMLDivElement>(null);
    const counter = createCounter();
    const renderGroup = useCallback(
      (group: GroupShape) => (
        <Optgroup
          className={optionGroupClassName}
          label={group.label}
          key={group.label}
        >
          {group.options.map((option) => renderOption(option, counter()))}
        </Optgroup>
      ),
      [Optgroup, optionGroupClassName, renderOption, counter],
    );

    useVisibleOptions({
      visibleOptions,
      listRef,
      open,
      invalidate: options,
    });

    const { getCSS } = useSelectTheme();

    if (options.length === 0 && !emptyPlaceholder) {
      return null;
    }

    const renderListItems = () => (
      <>
        {options.map((option) =>
          isGroup(option)
            ? renderGroup(option)
            : renderOption(option, counter()),
        )}

        {emptyPlaceholder && options.length === 0 && (
          <div
            css={{
              color: colors.grey400,
              padding: scale(1),
            }}
          >
            {emptyPlaceholder}
          </div>
        )}
      </>
    );

    const renderWithNativeScrollbar = () => (
      <ul
        className="option-list"
        css={{
          overflow: 'auto',
          width: '100%',
          '::-webkit-scrollbar-thumb': {
            backgroundColor: colors?.grey400,
            borderRadius: scale(4),
          },
          '::-webkit-scrollbar': {
            maxWidth: 6,
          },

          '::-webkit-scrollbar-track': {
            backgroundColor: colors?.grey100,
            borderRadius: scale(4),
          },
        }}
        ref={mergeRefs([listRef, ref])}
        onScroll={onScroll}
      >
        {renderListItems()}
      </ul>
    );

    return (
      <div
        className={className}
        css={{
          width: '100%',
          outline: 'none',
          ...getCSS('optionList'),
        }}
      >
        {header}
        {renderWithNativeScrollbar()}
        {footer}
      </div>
    );
  },
);
