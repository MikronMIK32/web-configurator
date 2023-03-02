import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { useMemo, useRef, useState } from 'react';
import Droppanel, {
  DroppanelMode,
  DroppanelPivot,
  DroppanelOption,
} from './Droppanel';
import Pin from './Pin';
import PinColumn, { PinColumnProps } from './PinColumn';

// TODO

const SIZE = scale(32);
const COL_WIDTH = scale(10);
const COLUMN_PINS_COUNT = 8;

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

  const cols = useMemo(() => {
    const result: (PinColumnProps & {
      pins: { name: string; id: number }[];
    })[] = [
      // левая
      {
        left: -COL_WIDTH,
        top: scale(3),
        pins: [],
        rotation: 0,
      },
      // нижняя
      {
        left: (scale(3) * (COLUMN_PINS_COUNT * 3 - 2)) / 6,
        top: SIZE - COL_WIDTH / 2 - scale(3),
        pins: [],
        rotation: -90,
      },
      // правая
      {
        left: SIZE,
        top: scale(3),
        pins: [],
        rotation: 0,
        reverse: true,
      },
      // верхняя
      {
        left: (scale(3) * (COLUMN_PINS_COUNT * 3 - 2)) / 6,
        top: -SIZE / 2 - (scale(2) - 2),
        pins: [],
        rotation: -90,
        reverse: true,
      },
    ];

    for (let j = 0; j < 4; j += 1) {
      const arr: { name: string; id: number }[] = [];
      for (let i = 0; i < COLUMN_PINS_COUNT; i += 1) {
        const id = i + j * COLUMN_PINS_COUNT;

        arr.push({
          id,
          name: `Pin${id + 1}`,
        });
      }

      result[j].pins = arr;
    }

    return result;
  }, []);

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
        onSelect={(e) => {
          console.log(e);
        }}
      />

      <div
        css={{
          position: 'relative',
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

            width: SIZE,
            height: SIZE,
          }}
        >
          MIK32 (QFPN32)
        </div>
        {cols.map((col, i) => (
          <PinColumn key={i} width={COL_WIDTH} {...col}>
            {col.pins.map((pin, p_i) => (
              <Pin
                key={p_i}
                name={pin.name}
                isActive={false}
                onClick={() => {
                  console.log('pin clicked:', pin.id);
                }}
              >
                {/* <span>Бейджики</span> */}
              </Pin>
            ))}
          </PinColumn>
        ))}
      </div>
    </div>
  );
};

export default Microchip;
