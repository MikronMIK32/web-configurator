import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { ReactNode } from 'react';

export interface PinProps {
  name: string;
  isActive: boolean;
  children?: ReactNode | ReactNode[];
  onClick?: () => void;
}

// TODO
const Pin = ({ name, isActive, children, onClick }: PinProps) => (
  <div
    css={{
      position: 'relative',
      width: '100%',
    }}
  >
    <button
      type="button"
      css={{
        width: '100%',
        height: scale(3),
        cursor: 'pointer',
        padding: `${scale(1, true)}px ${scale(1)}px`,
        background: colors.grey100,
        ...(isActive && {
          background: colors.primary,
          color: colors.black,
        }),
      }}
      onClick={onClick}
    >
      {name}
    </button>
    {children}
  </div>
);

export default Pin;
