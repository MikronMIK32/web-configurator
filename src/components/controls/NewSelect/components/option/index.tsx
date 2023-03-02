import { CSSObject } from '@emotion/react';
import { FC, useMemo } from 'react';

// eslint-disable-next-line import/named
import { useSelectTheme } from '../../context';
import { OptionProps } from '../../types';
import { Checkmark as DefaultCheckMark } from '../checkmark';

export const Option: FC<OptionProps> = ({
  className,
  option,
  children,
  selected = false,
  highlighted = false,
  disabled = false,
  multiple,
  Checkmark = DefaultCheckMark,
  innerProps,
}) => {
  const content = children || option.content || option.key;
  const { showCheckMark = true } = option;

  const { getCSS } = useSelectTheme();

  const optionCSS = useMemo(
    () =>
      getCSS('option', {
        isDisabled: disabled,
        isHover: highlighted,
        isSelected: selected,
        isPreloader: option.isPreloader || false,
      }) as CSSObject,
    [disabled, getCSS, highlighted, selected, option.isPreloader]
  );

  return (
    <li {...innerProps} className={className} css={optionCSS}>
      {Checkmark && showCheckMark && (
        <Checkmark
          disabled={disabled}
          selected={selected}
          multiple={multiple}
          position="before"
          css={{ display: 'inline-flex' }}
        />
      )}
      {content}
      {/** Workaround чтобы для клика показывать отметку справа и всегда в виде иконки */}
      {Checkmark && showCheckMark && (
        <Checkmark
          disabled={disabled}
          selected={selected}
          multiple={multiple}
          css={{ display: 'inline-flex' }}
          position="after"
        />
      )}
    </li>
  );
};
