import { months, weekDays } from '@scripts/constants';

export const weekDaysOptions = weekDays.map((option, index) => ({
  key: option,
  value: index,
}));

export const weekDaysOptionsNullable = [{ value: null, key: 'Любой' }, ...weekDaysOptions];

export const getTerm = (val: number | null) => (val === null ? 'XX' : `${val}`.padStart(2, '0'));

export const optionsHours = [...Array(24)].map((_, i) => ({
  value: i,
  key: getTerm(i),
}));

export const optionsDays = [...Array(31)].map((_, i) => ({
  value: i + 1,
  key: getTerm(i + 1),
}));

export const optionsHoursNullable = [{ value: null, key: 'Любой' }, ...optionsHours];

export const optionsMinutes = [...Array(60)].map((_, i) => ({
  value: i,
  key: getTerm(i),
}));
export const optionsMinutesNullable = [{ value: null, key: 'Любой' }, ...optionsMinutes];

export const optionsSeconds = [...Array(60)].map((_, i) => ({
  value: i,
  key: getTerm(i),
}));
export const optionsSecondsNullable = [{ value: null, key: 'Любой' }, ...optionsSeconds];

export const valueToDate = (year: any, month: any, day: any) => {
  const monthStr = `${Number(month) + 1}`.padStart(2, '0');
  const dayStr = `${day}`.padStart(2, '0');
  const dateStr = `${monthStr}-${dayStr}-${year}`;
  const tryDate = new Date(dateStr);

  if (tryDate.getMonth() !== month) {
    return undefined;
  }

  return tryDate;
};

export const optionsMonths = months.map((month, index) => ({
  key: month,
  value: index,
}));
