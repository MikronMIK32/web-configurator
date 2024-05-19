import type { CSSObject } from '@emotion/react';
import { FC, useContext, useEffect } from 'react';

import { scale } from '@scripts/helpers';

import CrossIcon from '@icons/small/close.svg?react';

import { BaseModalContext } from '../../BaseModal';
import { usePopupContext } from '../PopupContext';
import type { HeaderProps } from '../types';

export const Header: FC<HeaderProps> = ({ className, addonCSS, contentCSS, leftAddons, children, title }) => {
  const { headerOffset, headerHighlighted, setHasHeader, onClose } = useContext(BaseModalContext);

  const {
    getCSS,
    state: { hasCloser },
  } = usePopupContext();

  const hasContent = !!title || Boolean(children);

  useEffect(() => {
    setHasHeader(true);
  }, [setHasHeader]);

  return (
    <div
      className={className}
      css={getCSS('header', { offset: headerOffset, hasContent, highlighted: headerHighlighted }) as CSSObject}
    >
      {leftAddons && (
        <div
          css={{
            minHeight: scale(6),
            height: scale(6),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'all',
            ...addonCSS,
          }}
        >
          {leftAddons}
        </div>
      )}

      {hasContent && (
        <div
          css={{
            ...(getCSS('headerContent') as CSSObject),
            ...contentCSS,
          }}
        >
          {children}
          {title && <div css={getCSS('headerTitle') as CSSObject}>{title}</div>}
        </div>
      )}

      {hasCloser && (
        <button type="button" onClick={e => onClose(e, 'closerClick')}>
          <CrossIcon css={getCSS('headerCloser') as CSSObject} />
        </button>
      )}
    </div>
  );
};
