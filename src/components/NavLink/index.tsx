// import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';

import { themes } from './themes';
import {
  NavLinkProps,
  NavLinkStateFull,
  /* NAV_LINK_ACTIVE */
} from './types';

const NavLink = ({
  theme = themes.basic,
  size = 'md',
  variant = 'dark',
  rounded = true,
  children,
  className,
  to,
}: NavLinkProps) => {
  const state = useMemo<NavLinkStateFull>(
    () => ({
      isActive: false, // TODO: useMatch
      rounded,
      size,
      variant,
    }),
    [rounded, size, variant]
  );

  const getCSS = useCallback(
    (key: keyof typeof theme) => {
      const element = theme[key];
      if (typeof element === 'function') return element(state);
      return element;
    },
    [state, theme]
  );

  const labelCSS = useMemo(() => getCSS('label'), [getCSS]);
  // const iconCSS = useMemo(() => getCSS('icon'), [getCSS]);

  return (
    <ReactNavLink to={to} className={className} css={labelCSS}>
      {children}
    </ReactNavLink>
  );
};

export default NavLink;
