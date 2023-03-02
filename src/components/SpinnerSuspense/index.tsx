import { ReactNode, Suspense } from 'react';

import { colors } from '@scripts/colors';
import { rgba, scale } from '@scripts/helpers';

import { ReactComponent as Icon } from '@icons/custom/spinner.svg';

const SpinnerSuspense = ({ children }: { children: ReactNode | ReactNode[] }) => (
  <Suspense
    fallback={
      <div
        css={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          background: rgba(colors.black, 0.3),
        }}
      >
        <Icon css={{ width: scale(5), height: scale(5) }} />
      </div>
    }
  >
    {children}
  </Suspense>
);

export default SpinnerSuspense;
