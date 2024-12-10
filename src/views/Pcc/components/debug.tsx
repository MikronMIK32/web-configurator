import { useEffect, useState } from 'react';
import { CELL_SIZE } from '../constants';
import { colors } from '@scripts/colors';

export const CodeArea = ({
  initialValue,
  onChange,
  className,
}: {
  className?: string;
  initialValue: string;
  onChange: (newValue: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <textarea
      css={{
        width: 400,
        height: 100,
        overflow: 'auto',
      }}
      className={className}
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      onBlur={() => {
        if (initialValue !== value) onChange(value);
      }}
    />
  );
};

export const VisualGrid = ({ visible }: { visible: boolean }) => {
  return (
    <>
      <defs>
        <pattern id="smallGrid" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
          <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke={colors.black} strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width={CELL_SIZE * 10} height={CELL_SIZE * 10} patternUnits="userSpaceOnUse">
          <rect width={CELL_SIZE * 10} height={CELL_SIZE * 10} fill="url(#smallGrid)" />
          <path
            d={`M ${CELL_SIZE * 10} 0 L 0 0 0 ${CELL_SIZE * 10}`}
            fill="none"
            stroke={colors.black}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      {visible && (
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          css={{
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};
