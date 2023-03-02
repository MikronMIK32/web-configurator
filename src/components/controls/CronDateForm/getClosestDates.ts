import { parseSafeInt } from '@scripts/helpers';
import cronParser from 'cron-parser';

interface DateProps {
  day: any;
  month: any; // 0 - 11
  year: any;
}

interface getClosestDatesProps extends DateProps {
  length: number;
}

const createCronString = ({ day, month }: Pick<DateProps, 'day' | 'month'>) => {
  const cDay = day || '*';
  const cMonth = month === null ? '*' : month + 1;
  const cronString = `0 0 ${cDay} ${cMonth} *`;

  return cronString;
};

export const getClosestDates = ({
  day: propDay,
  month: propMonth,
  year: propYear,
  length,
}: getClosestDatesProps) => {
  const cron = createCronString({
    day: parseSafeInt(propDay),
    month: parseSafeInt(propMonth),
  });

  const year = parseSafeInt(propYear);
  const startDate = new Date();
  if (year) {
    startDate.setFullYear(year);
  }

  try {
    const interval = cronParser.parseExpression(cron, {
      currentDate: startDate,
    });

    const results: number[] = [];

    for (let i = 0; i < length; i += 1) {
      if (!interval.hasNext()) break;
      const d = new Date(interval.next().getTime());
      if (year) d.setFullYear(year);
      results.push(d.getTime());
    }

    return [...new Set(results)].map((e) => new Date(e));
  } catch (e) {
    return [];
  }
};
