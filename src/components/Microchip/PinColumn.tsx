import { ReactNode } from 'react';

export interface PinColumnProps {
  children?: ReactNode | ReactNode[];
  rotation: number;
  width?: number;
  reverse?: boolean;
  parentSize: number;
  left: string | number;
  top: string | number;
}

const PinColumn = ({
  width,
  rotation,
  children,
  reverse,
  parentSize,
  left,
  top,
}: PinColumnProps) => (
  <div
    css={{
      position: 'absolute',
      width,
      top,
      left,
      transform: `rotate(${rotation}deg) translate(-${parentSize/2}px, -${parentSize/2}px)`,
      transformOrigin: 'center'
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
