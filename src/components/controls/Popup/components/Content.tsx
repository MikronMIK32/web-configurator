import type { CSSObject } from '@emotion/react';
import { Ref, forwardRef, useContext } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { BaseModalContext } from '../../BaseModal';
import { usePopupContext } from '../PopupContext';
import type { ContentProps } from '../types';

export const Content = forwardRef<HTMLDivElement, ContentProps>(({ children, className }, ref) => {
  const { contentRef } = useContext(BaseModalContext);

  const { getCSS } = usePopupContext();

  return (
    <div
      className={className}
      css={getCSS('content') as CSSObject}
      ref={mergeRefs([ref, contentRef as Ref<HTMLDivElement>])}
    >
      {children}
    </div>
  );
});
