import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

import { zodStringToNumber } from '@scripts/validations';

export enum ClockSource {
  OSC32M = 'OSC32M',
  OSC32K = 'OSC32K',
  HSI32M = 'HSI32M',
  LSI32M = 'LSI32M',
}

export const clockSourceOptions: OptionShape[] = [
  {
    key: 'Включить внешний источник 32мГц (OSC32M)',
    value: ClockSource.OSC32M,
  },
  {
    key: 'Включить внешний источник 32кГц (OSC32K)',
    value: ClockSource.OSC32K,
  },
  {
    key: 'Включить внутренний источник 32мГц (HSI32M)',
    value: ClockSource.HSI32M,
  },
  {
    key: 'Включить внутренний источник 32кГц (LSI32M)',
    value: ClockSource.LSI32M,
  },
];

export const systemSourceOptions: OptionShape[] = [
  {
    key: 'Внешний источник 32мГц (OSC32M)',
    value: ClockSource.OSC32M,
  },
  {
    key: 'Внешний источник 32кГц (OSC32K)',
    value: ClockSource.OSC32K,
  },
  {
    key: 'Внутренний источник 32мГц (HSI32M)',
    value: ClockSource.HSI32M,
  },
  {
    key: 'Внутренний источник 32кГц (LSI32M)',
    value: ClockSource.LSI32M,
  },
];

export enum MonitorClockSource {
  AUTO = 'auto',
  OSC32K = 'OSC32K',
  LSI32K = 'LSI32K',
}

export const monitorClockSourceOptions: OptionShape[] = [
  {
    key: 'Выбирается автоматически',
    value: MonitorClockSource.AUTO,
  },
  {
    key: 'Внешний источник 32кГц (OSC32K)',
    value: MonitorClockSource.OSC32K,
  },
  {
    key: 'Внутренний источник 32кГц (LSI32k',
    value: MonitorClockSource.LSI32K,
  },
];

export const pccStateSchema = z.object({
  clockSources: z.array(z.nativeEnum(ClockSource)),
  systemSource: z.nativeEnum(ClockSource),
  forceSystemSource: z.boolean(),
  monitorSource: z.nativeEnum(MonitorClockSource),

  // Делители частоты
  ahb: zodStringToNumber(
    z.number().min(0, 'Введите число больше или равное нулю').max(255, 'Введите число меньше 256')
  ),
  apb_m: zodStringToNumber(
    z.number().min(0, 'Введите число больше или равное нулю').max(255, 'Введите число меньше 256')
  ),
  ahb_p: zodStringToNumber(
    z.number().min(0, 'Введите число больше или равное нулю').max(255, 'Введите число меньше 256')
  ),

  coeff_HSI32M: zodStringToNumber(
    z.number().min(0, 'Введите число больше или равное нулю').max(255, 'Введите число меньше 256')
  ),
  coeff_LSI32K: zodStringToNumber(
    z.number().min(0, 'Введите число больше или равное нулю').max(255, 'Введите число меньше 256')
  ),
});

export type PccState = z.infer<typeof pccStateSchema>;

export const pccInitialState: PccState = {
  clockSources: [ClockSource.HSI32M, ClockSource.LSI32M, ClockSource.OSC32K, ClockSource.OSC32M],
  systemSource: ClockSource.OSC32M,
  forceSystemSource: false,
  monitorSource: MonitorClockSource.AUTO,

  ahb: 0,
  apb_m: 0,
  ahb_p: 0,

  coeff_HSI32M: 128,
  coeff_LSI32K: 128,
};

export const pccSlice = createSlice({
  name: 'pcc',
  initialState: pccInitialState,
  reducers: {
    setPcc: (_, action: PayloadAction<PccState>) => ({ ...action.payload }),
  },
});

export const { setPcc } = pccSlice.actions;
