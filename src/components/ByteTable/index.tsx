import { faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CellContext, ColumnDef, RowData } from '@tanstack/react-table';
import {
  MutableRefObject,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { ZodSchema } from 'zod';

import Table from '@components/Table';
import Mask from '@components/controls/Mask';
import FormSelect, { SimpleSelect } from '@components/controls/NewSelect';

import { scale } from '@scripts/helpers';

import { ByteTableFormat, formats, useAllFormatsValue } from './formats';

export interface ByteTableRow {
  address: string;
  value: number;
}

type ChangeRowHandler = (row: number, value: number) => void;

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onChangeRowRef: MutableRefObject<ChangeRowHandler>;
    sharedFormat?: ByteTableFormat;
    validationSchema?: ZodSchema;
    defaultValue: number[];
  }
}

export interface ByteTableProps {
  addrCol?: ColumnDef<ByteTableRow>;
  value: number[];
  defaultValue: number[];
  onChange?: (data: number[]) => void;
  validationSchema?: ZodSchema;
}

const defaultAddrCol: ColumnDef<ByteTableRow> = {
  accessorKey: 'address',
  header: 'Адрес',
  cell: ({ getValue }) => `${getValue()}`,
};

const Header = () => (
  <div css={{ display: 'flex', gap: scale(1), alignItems: 'center' }}>
    <span>Значение</span>
  </div>
);

const Cell = ({
  getValue,
  table: {
    options: { meta },
  },
  row: { index },
}: CellContext<ByteTableRow, unknown>) => {
  const { onChangeRowRef, sharedFormat, validationSchema, defaultValue } = meta || {};
  const { decValue, format, formattedValue, setValue, setFormat } = useAllFormatsValue(
    getValue() as number,
    sharedFormat
  );

  const masks = useMemo(
    () => [
      {
        mask: Number,
      },
      {
        mask: '{\\0b}#### #### #### ####',
        definitions: { '#': /[0-1]/gi },
      },
      {
        mask: '{\\0x}#### ####',
        definitions: { '#': /[0-9a-f]/gi },
        prepare: (s: string) => s.toUpperCase(),
      },
    ],
    []
  );

  const [isFilled, setFilled] = useState(false);
  const [val, setVal] = useState(formattedValue);
  useEffect(() => {
    if (!isFilled) return;
    setVal(formattedValue);
  }, [formattedValue, isFilled]);

  const error = useMemo(() => {
    const parse = validationSchema?.safeParse(val);

    if (!parse || parse.success) return undefined;
    return parse.error.issues.map(e => e.message).join('; ');
  }, [val, validationSchema]);

  const formatChangeRef = useRef(false);

  const [, setTransition] = useTransition();

  const defaultVal = defaultValue?.[index];
  const isDefaultValue = defaultVal === decValue;

  const maskRef = useRef<any>();

  const onResetDefault = useCallback(() => {
    setFormat(ByteTableFormat.INT);
    setVal(`${defaultVal}`);

    setTransition(() => {
      setValue(defaultVal);
    });

    if (typeof maskRef.current?.element?.focus === 'function') maskRef.current.element.focus();
  }, [defaultVal, setFormat, setValue]);

  return (
    <div css={{ display: 'flex', width: '100%', alignItems: 'start' }}>
      <Mask
        ref={maskRef}
        name={`value-${index}`}
        id={`value-${index}`}
        mask={masks}
        value={val}
        autoComplete="off"
        rightAddons={
          (!isDefaultValue || !isFilled) && (
            <button type="button" onClick={onResetDefault}>
              <FontAwesomeIcon icon={faRotateBack} />
            </button>
          )
        }
        onBlur={e => {
          e.preventDefault();

          setTimeout(() => {
            if (!error) {
              const dec = setValue(val);
              onChangeRowRef?.current?.(index, dec);
            }
          }, 0);
        }}
        size="md"
        error={error}
        onAccept={(newVal, ...other) => {
          if (formatChangeRef.current) {
            formatChangeRef.current = false;
            return;
          }

          console.log('[ByteTable] onAccept setVal=', newVal, 'other', other);
          setFilled(newVal !== '');
          setVal(newVal);

          setTransition(() => {
            if (newVal.startsWith('0b') && newVal.length === 2) return;
            if (newVal.startsWith('0x') && newVal.length === 2) return;

            setValue(newVal);
          });
        }}
        dispatch={(appended, dynamicMasked) => {
          const ignore = formatChangeRef.current;
          if (formatChangeRef.current) {
            formatChangeRef.current = false;
          }
          const { value } = dynamicMasked;
          const newVal = value + appended;

          if (newVal.substring(0, 2) === '0b') {
            if (!ignore && newVal.length > 2) setFormat(ByteTableFormat.BIN);
            return dynamicMasked.compiledMasks[1];
          }

          if (newVal.substring(0, 2) === '0x') {
            if (!ignore && newVal.length > 2) setFormat(ByteTableFormat.HEX);
            return dynamicMasked.compiledMasks[2];
          }

          if (!ignore && newVal.length) setFormat(ByteTableFormat.INT);
          return dynamicMasked.compiledMasks[0];
        }}
      />
      <FormSelect
        name={`format-${index}`}
        id={`format-${index}`}
        css={{
          minWidth: scale(20),
        }}
        // fieldCSS={{
        //   borderTopLeftRadius: '0!important',
        //   borderBottomLeftRadius: '0!important',
        // }}
        value={format}
        onChange={e => {
          const newFormat = formats.find(f => f.value === e)!;
          formatChangeRef.current = true;
          setFormat(newFormat.value);
        }}
        options={formats}
      />
    </div>
  );
};

const ByteTable = forwardRef<HTMLDivElement, ByteTableProps>(
  ({ addrCol = defaultAddrCol, value, defaultValue, onChange, validationSchema }, outerRef) => {
    const innerRef = useRef(null);
    const ref = mergeRefs([outerRef, innerRef]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, _setData] = useState(
      () =>
        value?.map((e, i) => ({
          address: `R${i}`,
          value: +e,
        })) || []
    );

    useEffect(() => {
      console.log('ByteTable Value changed!', value);
      // TODO: setData ?
    }, [value]);

    const onChangeRow = useCallback(
      (row: number, newValue: number) => {
        if (!onChange) return;

        const newData = (value || []).map((e, r) => {
          if (r === row) return newValue;
          return e;
        });

        onChange(newData);
      },
      [value, onChange]
    );

    const onChangeRowRef = useRef<ChangeRowHandler>(onChangeRow);
    onChangeRowRef.current = onChangeRow;

    const [sharedFormat, setSharedFormat] = useState<ByteTableFormat | undefined>(ByteTableFormat.INT);

    const selectedFormatOption = useMemo(() => formats.filter(e => e.value === sharedFormat), [sharedFormat]);

    const columns = useMemo<ColumnDef<ByteTableRow>[]>(
      () => [
        addrCol,
        {
          accessorKey: 'value',
          header: Header,
          cell: Cell,
        },
      ],
      [addrCol]
    );

    const tableOptions = useMemo(
      () => ({
        meta: {
          onChangeRowRef,
          sharedFormat,
          validationSchema,
          defaultValue,
        },
      }),
      [defaultValue, sharedFormat, validationSchema]
    );

    return (
      <div ref={ref}>
        <SimpleSelect
          options={formats}
          placeholder="Формат"
          size="md"
          selected={selectedFormatOption}
          onChange={payload => {
            setSharedFormat(payload.selected?.value);
          }}
          css={{
            maxWidth: 'fit-content',
            marginLeft: 'auto',
          }}
        />
        <Table
          columns={columns}
          data={data}
          css={{
            overflow: 'unset',
          }}
          options={tableOptions}
        />
      </div>
    );
  }
);

ByteTable.displayName = 'ByteTable';

export default memo(ByteTable);
