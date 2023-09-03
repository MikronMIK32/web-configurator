import { HTMLProps, forwardRef } from 'react';

import NavLink from '@components/NavLink';
import { NavLinkProps } from '@components/NavLink/types';

import { useTabsTheme } from '../../context';
import { TabListTitle } from '../../types';

type Props = TabListTitle & Omit<NavLinkProps, 'passHref'> & HTMLProps<HTMLAnchorElement>;

export const LinkTitle = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      href,
      ...restProps
    },
    ref
  ) => {
    delete restProps.renderTitle;
    delete restProps.unfocusable;
    const { getCSS } = useTabsTheme();

    if (hidden) return null;

    return (
      <NavLink
        {...(!disabled
          ? {
              to: {
                pathname: href,
              },
            }
          : {
              to: undefined as never as string,
            })}
        ref={ref}
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
        {...restProps}
      >
        {leftAddons && <span css={getCSS('toggleLeftAddons') as any}>{leftAddons}</span>}
        <span>{title}</span>
        {rightAddons && <span css={getCSS('toggleRightAddons') as any}>{rightAddons}</span>}
      </NavLink>
    );
  }
);

LinkTitle.displayName = 'LinkTitle';
