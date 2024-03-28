import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

import { zodStringToNumber } from '@scripts/validations';

export enum ClockSource {
  OSC32M = 'OSC32M',
  HSI32M = 'HSI32M',
  OSC32K = 'OSC32K',
  HSI32K = 'HSI32K',
}

const clockSourceTranslations: Record<keyof typeof ClockSource, string> = {
  OSC32M: 'Внешний 32 МГц',
  HSI32M: 'Внутренний 32 МГц',
  OSC32K: 'Внешний 32 кГц',
  HSI32K: 'Внутренний 32 кГц',
};

export const CLOCK_SOURCE_OPTIONS = (
  Object.keys(clockSourceTranslations) as (keyof typeof clockSourceTranslations)[]
).map<OptionShape>(e => ({
  key: clockSourceTranslations[e],
  value: ClockSource[e],
}));

export const wdtStateSchema = z.object({
  enabled: z.boolean(),
  clockSource: z.nativeEnum(ClockSource),
  initialTimerValue: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(4096)),
  divider: zodStringToNumber(z.number({ required_error: 'Обязательное поле' })),
});

export type WDTState = z.infer<typeof wdtStateSchema>;

export const wdtInitialState: WDTState = {
  enabled: false,
  clockSource: ClockSource.OSC32M,
  initialTimerValue: 0,
  divider: 1,
};

export const wdtSlice = createSlice({
  name: 'wdt',
  initialState: wdtInitialState,
  reducers: {
    setWDT: (_, action: PayloadAction<WDTState>) => ({ ...action.payload }),
  },
});

export const { setWDT } = wdtSlice.actions;
