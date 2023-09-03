import { CSSObject } from '@emotion/react';
import { FC, useContext, useEffect } from 'react';

import Layout from '@components/Layout';

import { BaseModalContext } from '../../BaseModal';
import { usePopupContext } from '../PopupContext';
import { FooterProps } from '../types';

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => {
  const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);
  const { getCSS } = usePopupContext();

  useEffect(() => {
    setHasFooter(true);
  }, [setHasFooter]);

  return (
    <Layout
      className={className}
      css={getCSS('footer', { highlighted: footerHighlighted }) as CSSObject}
      {...props}
      {...(props.type !== 'flex' &&
        !props.cols &&
        ({
          cols: 2,
        } as any))}
    >
      {children}
    </Layout>
  );
};
