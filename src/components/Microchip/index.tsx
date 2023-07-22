import { useMemo, useRef, useState } from 'react';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';

import Droppanel, { DroppanelMode, DroppanelOption, DroppanelPivot } from './Droppanel';
import Pin from './Pin';
import PinColumn, { PinColumnProps } from './PinColumn';

// TODO

const createRange = (from: number, to: number) => {
  const range = new Array(to - from + 1);

  // eslint-disable-next-line no-plusplus
  for (let i = from; i < to; i++) {
    range.push(i);
  }

  return range;
};

const PIN_HEIGHT = scale(3);
const COLUMN_PINS_COUNT = 16;
const SIZE = (COLUMN_PINS_COUNT + 1) * PIN_HEIGHT;
const COL_WIDTH = scale(10);

const Microchip = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // TODO: on click outside

  const draggableRef = useRef<HTMLDivElement>(null);

  const [initialPos, setInitialPos] = useState({
    x: -1000,
    y: -1000,
  });
  const [isOpen, setOpen] = useState(false);
  const [pivot, setPivot] = useState(DroppanelPivot.TopLeft);
  const [viewport, setViewport] = useState({
    translate: [0, 0],
    scale: 1,
  });

  const transform = useMemo(() => {
    const {
      scale: s,
      translate: [dx, dy],
    } = viewport;

    return `translate(${dx}px, ${dy}px) scale(${s})`;
  }, [viewport]);

  const options = useMemo<DroppanelOption<string>[]>(() => [], []);

  return (
    <div
      ref={wrapperRef}
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Droppanel
        initialPos={initialPos}
        isOpen={isOpen}
        mode={DroppanelMode.Fixed}
        pivot={pivot}
        options={options}
        onSelect={e => {
          console.log(e);
        }}
      />

      <div
        css={{
          position: 'relative',
          width: SIZE,
          height: SIZE,
        }}
        // style={{
        //   transform,
        // }}
      >
        <div
          ref={draggableRef}
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors.grey200,
            userSelect: 'none',
            width: '100%',
            height: '100%',
          }}
        >
          MIK32 (QFPN64)
        </div>
        <PinColumn
          width={COL_WIDTH}
          parentSize={SIZE}
          rotation={0}
          left={`calc(50% - ${COL_WIDTH}px)`}
          top="calc(50% - 2px)"
        >
          {createRange(1, 1 + 16).map(pin => (
            <Pin
              key={pin}
              name={`Pin #${pin}`}
              isActive={false}
              onClick={() => {
                console.log('pin clicked:', pin);
              }}
            >
              {/* <span>Бейджики</span> */}
            </Pin>
          ))}
        </PinColumn>
        <PinColumn
          reverse
          width={COL_WIDTH}
          parentSize={SIZE}
          rotation={90}
          left={-COL_WIDTH / 2}
          top={`calc(100% + ${COL_WIDTH / 2}px)`}
        >
          {createRange(1 + 16, 1 + 32).map(pin => (
            <Pin
              key={pin}
              name={`Pin #${pin}`}
              isActive={false}
              onClick={() => {
                console.log('pin clicked:', pin);
              }}
            >
              {/* <span>Бейджики</span> */}
            </Pin>
          ))}
        </PinColumn>
        <PinColumn reverse width={COL_WIDTH} parentSize={SIZE} rotation={0} left="150%" top="calc(50% - 2px)">
          {createRange(1 + 32, 1 + 48).map(pin => (
            <Pin
              key={pin}
              name={`Pin #${pin}`}
              isActive={false}
              onClick={() => {
                console.log('pin clicked:', pin);
              }}
            >
              {/* <span>Бейджики</span> */}
            </Pin>
          ))}
        </PinColumn>
        <PinColumn
          reverse
          width={COL_WIDTH}
          parentSize={SIZE}
          rotation={-90}
          left={`calc(100% - ${COL_WIDTH / 2}px)`}
          top={`calc(-100% - ${COL_WIDTH / 2}px)`}
        >
          {createRange(1 + 48, 1 + 64).map(pin => (
            <Pin
              key={pin}
              name={`Pin #${pin}`}
              isActive={false}
              onClick={() => {
                console.log('pin clicked:', pin);
              }}
            >
              {/* <span>Бейджики</span> */}
            </Pin>
          ))}
        </PinColumn>
      </div>
    </div>
  );
};

export default Microchip;
