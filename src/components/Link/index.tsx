// We dont want the default implementation of react-router. It lacks ability of using custom elements:
// <Link><Button as="a">..</Link>, like in next js.
import {
  AnchorHTMLAttributes,
  Children,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  cloneElement,
  isValidElement,
  useContext,
} from 'react';
import { UNSAFE_NavigationContext as NavigationContext, To, useHref, useLinkClickHandler } from 'react-router-dom';

const isBrowser =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function stripBasename(pathname: string, basename: string): string | null {
  if (basename === '/') return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }

  // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it
  const startIndex = basename.endsWith('/') ? basename.length - 1 : basename.length;
  const nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== '/') {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(startIndex) || '/';
}

export interface LinkProps extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'onClick'> {
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  to: To;
  children: ReactNode;
}

export const Link = ({ onClick, reloadDocument, replace, state, target, to, children }: LinkProps) => {
  const { basename } = useContext(NavigationContext);

  // Rendered into <a href> for absolute URLs
  let absoluteHref;
  let isExternal = false;

  if (typeof to === 'string' && ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to;

    // Only check for external origins client-side
    if (isBrowser) {
      const currentUrl = new URL(window.location.href);
      const targetUrl = to.startsWith('//') ? new URL(currentUrl.protocol + to) : new URL(to);
      const path = stripBasename(targetUrl.pathname, basename);

      if (targetUrl.origin === currentUrl.origin && path != null) {
        // Strip the protocol/origin/basename for same-origin absolute URLs
        // eslint-disable-next-line no-param-reassign
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    }
  }

  // Rendered into <a href> for relative URLs
  const href = useHref(to);

  const internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });
  function handleClick(event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }

  const onlyChild = Children.toArray(children)[0];

  if (!isValidElement(onlyChild)) {
    console.error('Invalid element as children of Link.');
    return null;
  }

  return cloneElement<any>(onlyChild, {
    href: absoluteHref || href,
    onClick: isExternal || reloadDocument ? onClick : handleClick,
    target,
  });
};
