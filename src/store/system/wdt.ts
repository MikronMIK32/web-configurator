import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { zodStringToNumber } from '@scripts/validations';

type OptionShape = { key: string; value: any };

export enum ClockSource {
  OSC32M = 'OSC32M',
  HSI32M = 'HSI32M',
  OSC32K = 'OSC32K',
  HSI32K = 'HSI32K',
}

const clockSourceTranslations: Record<keyof typeof ClockSource, string> = {
  OSC32M: 'Внешний 32 МГц (OSC32M)',
  HSI32M: 'Внутренний 32 МГц (HSI32M)',
  OSC32K: 'Внешний 32 кГц (OSC32K)',
  HSI32K: 'Внутренний 32 кГц (HSI32K)',
};

export const CLOCK_SOURCE_OPTIONS = (
  Object.keys(clockSourceTranslations) as (keyof typeof clockSourceTranslations)[]
).map<OptionShape>(e => ({
  key: clockSourceTranslations[e],
  value: ClockSource[e],
}));

export const wdtStateSchema = z
  .object({
    enabled: z.boolean(),
    clockSource: z.nativeEnum(ClockSource),
    timeBeforeReload: zodStringToNumber(
      z.number({ required_error: 'Обязательное поле' }).min(0, 'Значение должно быть больше 0')
    ),
  })
  .refine(
    val => {
      switch (val.clockSource) {
        case ClockSource.HSI32K:
        case ClockSource.OSC32K:
          return val.timeBeforeReload <= 511875;

        case ClockSource.HSI32M:
        case ClockSource.OSC32M:
          return val.timeBeforeReload <= 524;
        default:
          break;
      }
    },
    {
      path: ['timeBeforeReload'],
      message:
        'Значение не должно превышать 524 мс при тактировании от источника 32 Мгц и 511 875 мс при тактировании от источника 32 кГц',
    }
  );

export type WDTState = z.infer<typeof wdtStateSchema>;

export const wdtInitialState: WDTState = {
  enabled: false,
  clockSource: ClockSource.OSC32M,
  timeBeforeReload: 0,
};

export const wdtSlice = createSlice({
  name: 'wdt',
  initialState: wdtInitialState,
  reducers: {
    setWDT: (_, action: PayloadAction<WDTState>) => ({ ...action.payload }),
  },
});

export const { setWDT } = wdtSlice.actions;
