import { ReactNode } from 'react';

export interface PinColumnProps {
  children?: ReactNode | ReactNode[];
  left: number;
  top: number;
  rotation: number;
  width?: number;
  reverse?: boolean;
}

const PinColumn = ({
  top,
  left,
  width,
  rotation,
  children,
  reverse,
}: PinColumnProps) => (
  <div
    css={{
      position: 'absolute',
      top,
      left,
      width,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div
      css={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        width: '100%',
      }}
    >
      {children}
    </div>
  </div>
);

export default PinColumn;
