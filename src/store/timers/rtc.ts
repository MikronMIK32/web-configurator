import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toZod } from 'tozod';
import { z } from 'zod';

import { ErrorMessages, weekDays } from '@scripts/constants';
import { zodStringToNumber } from '@scripts/validations';

export enum RtcSourceType {
  External = 'internal',
  Internal = 'external',
}

export interface RtcTimeDate {
  year: number;
  month: number;
  day: number;
  weekDay: number;

  hours: number;
  minutes: number;
  seconds: number;
}

export interface AlarmTimeDate {
  year: number | null;
  month: number | null;
  day: number | null;
  weekDay: number | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
}

export const alarmDateTimeSchema = z
  .object({
    year: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
    month: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
    weekDay: z.number().nullable(),
    day: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
    hours: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
    minutes: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
    seconds: zodStringToNumber(z.number().nullable(), { fallbackValue: null }),
  })
  .superRefine((arg, ctx) => {
    const { day, month, year, weekDay } = arg;

    const dateStr = `${Number(month) + 1}-${day}-${year}`;
    const tryDate = new Date(dateStr);

    if (day && month && year && tryDate.getMonth() !== month) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Дата не существует',
        fatal: true,
        path: [],
      });
    }

    const parsedWeekDay = tryDate.getDay();
    const isParsedSet = !Number.isNaN(parsedWeekDay);
    const isWeekDaySet = weekDay !== null && weekDay !== undefined;
    if (isParsedSet && isWeekDaySet && weekDay !== parsedWeekDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: `Выберите "Любой" или "${weekDays[parsedWeekDay]}"`,
        fatal: true,
        path: ['weekDay'],
      });
    }
  }) as never as toZod<AlarmTimeDate>;

export const rtcDateTimeSchema = z
  .object({
    year: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
    month: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
    weekDay: z.number().optional(),
    day: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
    hours: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
    minutes: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
    seconds: zodStringToNumber(z.number({ required_error: ErrorMessages.Required })),
  })
  .superRefine((arg, ctx) => {
    const { day, month, year } = arg;

    const dateStr = `${Number(month) + 1}-${day}-${year}`;
    const tryDate = new Date(dateStr);

    if (tryDate.getMonth() !== month) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Дата не существует',
        fatal: true,
        path: [],
      });
    }
  }) as never as toZod<RtcTimeDate>;

export interface RtcState {
  rtcEnabled: boolean;
  alarmEnabled: boolean;

  rtcSource: RtcSourceType;
  rtcDateTime: RtcTimeDate;
  rtcRegisters: number[];

  alarmDateTime: AlarmTimeDate;
}

export const rtcStateSchema: toZod<Omit<RtcState, 'rtcSource'>> = z.object({
  alarmEnabled: z.boolean(),
  rtcEnabled: z.boolean(),
  rtcSource: z.nativeEnum(RtcSourceType),
  rtcDateTime: rtcDateTimeSchema,
  alarmDateTime: alarmDateTimeSchema,
  rtcRegisters: z.number({ invalid_type_error: 'Необходимо число, а не строка' }).array().length(16),
});

export const rtcRegisterSchema = zodStringToNumber(
  z
    .number()
    .min(0, 'Число должно быть больше 0')
    .max(2 ** 32 - 1, 'Число должно быть менее 2 ^ 32 - 1\n(4 294 967 295)')
);

export const rtcInitialState: RtcState = {
  alarmEnabled: false,
  rtcDateTime: {
    day: null as never as number,
    month: null as never as number,
    year: null as never as number,
    weekDay: null as never as number,
    hours: null as never as number,
    minutes: null as never as number,
    seconds: null as never as number,
  },
  alarmDateTime: {
    year: null,
    day: null,
    hours: null,
    minutes: null,
    month: null,
    seconds: null,
    weekDay: null,
  },
  rtcEnabled: false,
  rtcRegisters: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  rtcSource: RtcSourceType.Internal,
};

export const rtcSlice = createSlice({
  name: 'rtc',
  initialState: rtcInitialState,
  reducers: {
    setRtc: (_, action: PayloadAction<RtcState>) => ({
      ...action.payload,
      ...(!action.payload.alarmEnabled && { alarmDateTime: rtcInitialState.alarmDateTime }),
      ...(!action.payload.rtcEnabled && rtcInitialState),
    }),
    setAlarmEnabled: (state, action: PayloadAction<boolean>) => {
      state.alarmEnabled = action.payload;
    },
    setRtcEnabled: (state, action: PayloadAction<boolean>) => {
      state.rtcEnabled = action.payload;

      if (!state.rtcEnabled) {
        state.alarmEnabled = false;
      }
    },
    setRtcDateTime: (state, action: PayloadAction<RtcTimeDate>) => {
      state.rtcDateTime = action.payload;
    },
    setRtcSource: (state, action: PayloadAction<RtcSourceType>) => {
      state.rtcSource = action.payload;
    },
    setRtcRegisters: (state, action: PayloadAction<RtcState['rtcRegisters']>) => {
      state.rtcRegisters = action.payload;
    },
    setRtcRegister: (state, action: PayloadAction<{ index: number; value: number }>) => {
      state.rtcRegisters[action.payload.index] = action.payload.value;
      state.rtcRegisters = [...state.rtcRegisters] as any;
    },
  },
});

export const { setRtc, setAlarmEnabled, setRtcEnabled, setRtcDateTime, setRtcSource, setRtcRegisters, setRtcRegister } =
  rtcSlice.actions;
