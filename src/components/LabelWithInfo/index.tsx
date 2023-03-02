import { ReactNode } from 'react';

import { DetailsTrigger, DetailsTriggerProps } from '@components/DetailsTrigger';

import { scale } from '@scripts/helpers';

const LabelWithInfo = ({ children, ...props }: { children: ReactNode } & DetailsTriggerProps) => (
  <div css={{ display: 'flex', gap: scale(1), alignItems: 'baseline' }}>
    <span>{children}</span>
    <DetailsTrigger {...props} />
  </div>
);

export default LabelWithInfo;
