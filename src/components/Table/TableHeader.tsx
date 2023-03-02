import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { FC, ReactNode } from 'react';

export const TableHeader: FC<{ children: ReactNode | ReactNode[] }> = (
  props,
) => (
  <header
    css={{
      background: colors.white,
      padding: `${scale(2)}px 0`,
      display: 'flex',
      alignItems: 'center',
    }}
    {...props}
  />
);
