import { useEffect, useMemo, useState } from 'react';

import Button from '@components/controls/Button';

import HorizontalLine from './components/HorizontalLine';
import InputBlock from './components/InputBlock';
import Multiplexor from './components/Multiplexor';
import VerticalLine from './components/VerticalLine';
import { CELL_SIZE, COLS, ROWS, initialSchemaCode } from './constants';
import getCellCss from './getCellCss';
import { HorizontalLineProps, InputBlockProps, MultiplexorProps, SchemaItem, VerticalLineProps } from './types';

function normalizeIndex(index: number, max: number) {
  return index < 0 ? max + index : index;
}

const gridLines: SchemaItem[] = [];

for (let row = 1; row <= ROWS + 1; row++) {
  gridLines.push({
    type: 'horizontal-line',
    col: 1,
    width: 'cols',
    row,
    height: 1,
    color: 'rgba(255, 0, 0, 0.1)',
  });
}

for (let col = 1; col <= COLS + 1; col++) {
  gridLines.push({
    type: 'vertical-line',
    col,
    width: 1,
    row: 1,
    height: 'rows',
    color: 'rgba(255, 0, 0, 0.1)',
  });
}

const CodeArea = ({ initialValue, onChange }: { initialValue: string; onChange: (newValue: string) => void }) => {
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
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      onBlur={() => {
        if (initialValue !== value) onChange(value);
      }}
    />
  );
};

const Pcc = () => {
  const [code, setCode] = useState(initialSchemaCode);
  console.log(code);
  const schema = useMemo(() => JSON.parse(code) as SchemaItem[], [code]);

  const [showGrid, setShowGrid] = useState(false);

  return (
    <div
      css={{
        overflow: 'auto',
        padding: 32,
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button size="sm" onClick={() => setShowGrid(old => !old)}>
          Переключить визуализацию сетки
        </Button>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <p>Вставьте сюда новый код</p>
          <CodeArea initialValue={code} onChange={setCode} />
        </div>
      </div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
          gap: 0,
        }}
      >
        {showGrid && (
          <>
            {gridLines.map(({ type, col, row, width, height, ...props }) => {
              const key = `${type}-${col}-${row}`;
              if (width === 'cols') width = COLS;
              if (height === 'rows') height = ROWS;
              col = normalizeIndex(col, COLS);
              row = normalizeIndex(row, ROWS);
              const css = getCellCss(col, row, width, height);

              switch (type) {
                case 'vertical-line':
                  return <VerticalLine key={key} {...(props as VerticalLineProps)} css={css} />;
                case 'horizontal-line':
                  return <HorizontalLine key={key} {...(props as HorizontalLineProps)} css={css} />;
              }
            })}
          </>
        )}

        {schema.map(({ type, col, row, width, height, ...props }) => {
          const key = `${type}-${col}-${row}`;
          if (width === 'cols') width = COLS;
          if (height === 'rows') height = ROWS;
          col = normalizeIndex(col, COLS);
          row = normalizeIndex(row, ROWS);
          const css = getCellCss(col, row, width, height);

          switch (type) {
            case 'multiplexor':
              return <Multiplexor key={key} {...(props as MultiplexorProps)} css={css} />;
            case 'input-block': {
              const { editable, ...rest } = props as InputBlockProps;
              return (
                <InputBlock
                  key={key}
                  {...rest}
                  width={width}
                  css={css}
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
            case 'vertical-line':
              return <VerticalLine key={key} {...(props as VerticalLineProps)} css={css} />;
            case 'horizontal-line':
              return <HorizontalLine key={key} {...(props as HorizontalLineProps)} css={css} />;
            default:
              return null; // Handle unexpected types if necessary
          }
        })}
      </div>
    </div>
  );
};

export default Pcc;
