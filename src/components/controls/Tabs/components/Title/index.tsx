import { ButtonHTMLAttributes, forwardRef } from 'react';

import { colors } from '@scripts/colors';

import { useTabsTheme } from '../../context';
import { TabListTitle } from '../../types';

type Props = TabListTitle & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'>;

export const Title = forwardRef<HTMLButtonElement, Props>(
  (
    {
      id,
      toggleCSS,
      title,
      rightAddons = null,
      leftAddons = null,
      hidden = false,
      selected = false,
      disabled = false,
      collapsed = false,
      focused = false,
      isOption = false,
      countErrors,

      ...restProps
    },
    ref
  ) => {
    delete restProps.renderTitle;
    delete restProps.unfocusable;

    const { getCSS } = useTabsTheme();

    if (hidden) return null;

    return (
      <button
        {...restProps}
        ref={ref}
        disabled={disabled}
        type="button"
        id={`${id}`}
        css={{
          ...(getCSS('toggle', {
            disabled,
            isSelected: selected,
            focused,
            isOption,
            isCollapsed: collapsed && !isOption,
          }) as any),
          ...toggleCSS,
        }}
      >
        {leftAddons && <span css={getCSS('toggleLeftAddons') as any}>{leftAddons}</span>}

        <span css={{ ...(countErrors > 0 && { color: colors.error }) }}>{title}</span>

        {rightAddons && <span css={getCSS('toggleRightAddons') as any}>{rightAddons}</span>}

        {countErrors > 0 && <span css={getCSS('errorAddon') as any}>{countErrors}</span>}
      </button>
    );
  }
);

Title.displayName = 'Title';
