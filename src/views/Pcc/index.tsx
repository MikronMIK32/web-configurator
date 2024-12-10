import { useMemo, useState } from 'react';

import Button from '@components/controls/Button';

import InputBlock, { InputBlockProps } from './components/InputBlock';
import Intersection, { IntersectionProps } from './components/Intersection';
import Multiplexor, { MultiplexorProps } from './components/Multiplexor';
import Wire, { WireProps } from './components/Wire';
import { CELL_SIZE, COLS, ROWS, initialSchemaCode } from './constants';
import getCellCss from './getCellCss';
import { IComponent } from './types';
import { CodeArea, VisualGrid } from './components/debug';
import { useLocalStorage } from 'usehooks-ts';

type ExtractSchemaItem<TComp extends IComponent<any, any>> =
  TComp extends IComponent<infer TProps, infer TName> ? { type: TName } & TProps : never;

export type SchemaItem =
  | ExtractSchemaItem<typeof InputBlock>
  | ExtractSchemaItem<typeof Intersection>
  | ExtractSchemaItem<typeof Multiplexor>
  | ExtractSchemaItem<typeof Wire>;

function normalizeIndex(index: number, max: number) {
  return index < 0 ? max + index : index;
}

const Pcc = () => {
  const [code, setCode] = useLocalStorage('test-key', initialSchemaCode);

  const [showGrid, setShowGrid] = useState(true);

  const schema = useMemo(() => {
    try {
      const res = JSON.parse(code) as SchemaItem[];
      return { result: res, error: null };
    } catch (e: any) {
      return { result: null, error: e?.message };
    }
  }, [code]);

  return (
    <div
      css={{
        overflow: 'auto',
        padding: 32,
        display: 'flex',
        gap: 16,
        flexDirection: 'column',

        // Uncomment to allow page scroll
        height: '100%',
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button size="sm" onClick={() => setShowGrid(old => !old)}>
            Переключить визуализацию сетки
          </Button>
          <Button size="sm" onClick={() => {
            const confirmed = window.confirm("Текущее содержимое localstorage будет заменено. Продолжить?");
            if (confirmed) {
              console.log("Update confirmed!");
              setCode(initialSchemaCode);
            } else {
              console.log("Update canceled.");
            }

          }}>
            Обновить схему в Localstorage
          </Button>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <p>Вставьте сюда новый код</p>
          <CodeArea
            initialValue={code}
            onChange={setCode}
            css={{
              border: '2px solid ' + (schema.error ? 'red' : 'transparent'),
            }}
          />
          {schema.error && (
            <code
              css={{
                display: 'block',
                fontSize: '0.875rem',
                background: 'red',
                color: 'white',
                padding: 4,
                borderRadius: 2,
              }}
            >
              {JSON.stringify(schema.error)}
            </code>
          )}
        </div>
      </div>

      <div
        css={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
          gap: 0,
          position: 'relative',
          // Если захотим поведение шоб вся страница скроллилась
          // overflowX: 'auto',
          // overflowY: 'clip',
        }}
      >
        <svg
          width={COLS * CELL_SIZE}
          height={ROWS * CELL_SIZE}
          viewBox={`0 0 ${COLS * CELL_SIZE} ${ROWS * CELL_SIZE}`}
          css={{
            ...getCellCss(1, 1, COLS, ROWS),
          }}
          // shapeRendering="crispEdges"
          vectorEffect="non-scaling-stroke"
        >
          <VisualGrid visible={showGrid} />
          {schema.result
            ? schema.result.map(({ type, ...props }) => {
              const key = props.name || `${type}-${props.col}-${props.row}-${props.width}-${props.height}`;

              if ((props.width as any) === 'cols') props.width = COLS;
              if ((props.height as any) === 'rows') props.height = ROWS;

              props.col = normalizeIndex(props.col, COLS);
              props.row = normalizeIndex(props.row, ROWS);

              switch (type) {
                case 'input-block':
                  return <InputBlock.AtlasComponent key={key} isDebug={showGrid} {...(props as InputBlockProps)} />;
                case 'multiplexor':
                  return <Multiplexor.AtlasComponent key={key} isDebug={showGrid} {...(props as MultiplexorProps)} />;
                case 'intersection':
                  return (
                    <Intersection.AtlasComponent key={key} isDebug={showGrid} {...(props as IntersectionProps)} />
                  );
                case 'wire':
                  return <Wire.AtlasComponent key={key} isDebug={showGrid} {...(props as WireProps)} />;
                default:
                  return null; // Handle unexpected types if necessary
              }
            })
            : null}
        </svg>

        {schema.result
          ? schema.result.map(({ type, ...props }) => {
            const key = props.name || `${type}-${props.col}-${props.row}-${props.width}-${props.height}`;

            if ((props.width as any) === 'cols') props.width = COLS;
            if ((props.height as any) === 'rows') props.height = ROWS;

            props.col = normalizeIndex(props.col, COLS);
            props.row = normalizeIndex(props.row, ROWS);

            switch (type) {
              case 'multiplexor':
                return <Multiplexor.NativeComponent key={key} {...(props as MultiplexorProps)} />;
              case 'input-block': {
                const { editable, ...rest } = props as InputBlockProps;
                return (
                  <InputBlock.NativeComponent
                    key={key}
                    {...rest}
                    onChange={
                      editable
                        ? newValue => {
                          alert(
                            `Спасибо что попытались ввести сюда ${newValue}. Я не знаю схему данных и валидацию, а так же не знаю опции выпадающие. поэтому увы!`
                          );
                        }
                        : undefined
                    }
                  />
                );
              }
              default:
                return null; // Handle unexpected types if necessary
            }
          })
          : null}
      </div>
    </div>
  );
};

export default Pcc;
