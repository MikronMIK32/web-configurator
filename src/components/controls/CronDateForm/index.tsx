import { forwardRef, useEffect, useMemo, useState, useTransition } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  optionsHoursNullable,
  optionsMinutesNullable,
  optionsSecondsNullable,
  weekDaysOptionsNullable,
} from '@controls/DateTimeForm/utils';
import Form from '@controls/Form';
import Mask from '@controls/Mask';
import Select, { OptionShape } from '@controls/NewSelect';

import { colors } from '@scripts/colors';
import { months } from '@scripts/constants';
import { parseSafeInt, scale } from '@scripts/helpers';
import { usePrevious } from '@scripts/hooks/usePrevious';

import { getClosestDates } from './getClosestDates';

export interface CronDateFormValues {
  year: number | null;
  month: number | null; // 0 ... 11, 0 - январь
  day: number | null;
  weekDay: number | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
}

export interface CronDateFormProps {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CronDateForm = ({ name }: CronDateFormProps, _ref?: any) => {
  const optionsMonths = useMemo<OptionShape[]>(
    () => [
      {
        key: 'Любой',
        value: null,
      },
      ...months.map((month, index) => ({
        key: month,
        value: index,
      })),
    ],
    []
  );

  const {
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();
  const dateError = errors?.[name];

  const year = watch(`${name}.year`);
  const month = watch(`${name}.month`);
  const day = watch(`${name}.day`);
  const weekDay = watch(`${name}.weekDay`);

  const revalidateHash = `${year}${weekDay}`;
  const prevHash = usePrevious(revalidateHash);

  useEffect(() => {
    if (revalidateHash === prevHash) return;

    trigger(name, { shouldFocus: false });
  }, [name, prevHash, revalidateHash, trigger]);

  const [closestDate, setClosestDate] = useState('...');
  const [, startTransition] = useTransition();

  useEffect(() => {
    const dates = getClosestDates({ day, month, year, length: 4 });

    startTransition(() => {
      const closestDates = dates.map(e => e.toLocaleDateString()).join(', ');
      setClosestDate(closestDates);
    });
  }, [day, month, year]);

  return (
    <div>
      <div
        css={{
          border: `1px solid ${colors?.autofill}`,
          padding: scale(1),
          marginBottom: scale(1),
        }}
      >
        <strong>Даты ближайшего повторения:</strong>
        {dateError ? (
          <p css={{ color: colors.errorDark }}>{dateError?.message?.toString()}</p>
        ) : (
          <p
            css={{
              marginTop: scale(1),
            }}
          >
            {closestDate || 'N/A'}
          </p>
        )}
      </div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: scale(1),
        }}
      >
        <Form.Field label="Год" name={`${name}.year`}>
          <Mask mask="0000" autoComplete="off" size="md" transformValue={parseSafeInt} />
        </Form.Field>
        <Form.Field label="Месяц" name={`${name}.month`}>
          <Select options={optionsMonths} />
        </Form.Field>
        <Form.Field label="Число" name={`${name}.day`}>
          <Mask mask={Number} min={1} max={31} autoComplete="off" size="md" transformValue={parseSafeInt} />
        </Form.Field>
        <Form.Field label="День недели" name={`${name}.weekDay`}>
          <Select options={weekDaysOptionsNullable} />
        </Form.Field>
        <Form.Field label="Часы" name={`${name}.hours`}>
          <Select options={optionsHoursNullable} />
        </Form.Field>
        <Form.Field label="Минуты" name={`${name}.minutes`}>
          <Select options={optionsMinutesNullable} />
        </Form.Field>
        <Form.Field label="Секунды" name={`${name}.seconds`}>
          <Select options={optionsSecondsNullable} />
        </Form.Field>
      </div>
    </div>
  );
};

export default forwardRef(CronDateForm);
