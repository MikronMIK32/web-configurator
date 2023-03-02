import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { ReactNode } from 'react';

export const PeripheryWrapper = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <div
    css={{
      padding: scale(2),
      height: '100%',
    }}
  >
    <h4 css={{ marginBottom: scale(2), ...typography('h4') }}>{title}</h4>
    {children}
  </div>
);
