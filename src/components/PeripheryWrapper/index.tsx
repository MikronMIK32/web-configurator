import { ReactNode } from 'react';

import LoadingSkeleton from '@components/controls/LoadingSkeleton';

import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';

type Props = {
  className?: string;
  isLoading?: boolean;
} & (
  | {
      title: string;
      children: ReactNode;
      isLoading?: never;
    }
  | {
      title?: never;
      children?: never;
      isLoading?: true;
    }
);

export const PeripheryWrapper = ({ children, title, isLoading, className }: Props) => (
  <div
    className={className}
    css={{
      height: '100%',
    }}
  >
    <h4 css={{ marginBottom: scale(2), ...typography('h4') }}>
      {isLoading ? <LoadingSkeleton height={scale(4)} /> : title}
    </h4>
    {isLoading ? <LoadingSkeleton height={scale(6)} count={8} css={{ marginBottom: scale(2) }} /> : children}
  </div>
);
