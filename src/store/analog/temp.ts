import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

import { pccClockSourceFreq } from '@store/system/pcc';

import { zodStringToNumber } from '@scripts/validations';

import { RootState } from '..';

export enum ClockSource {
  SYS_CLK = 'SYS_CLK',
  HCLK = 'HCLK',
  OSC32M = 'OSC32M',
  HSI32M = 'HSI32M',
  OSC32K = 'OSC32K',
  LSI32K = 'LSI32K',
}

const clockSourceTranslations: Record<keyof typeof ClockSource, string> = {
  SYS_CLK: 'Системная частота (sys_clk)',
  HCLK: 'Частоты шины AHB (hclk)',
  OSC32M: 'Частота внешего осциллятора 32 МГц (OSC32M)',
  HSI32M: 'Частота внутреннего осциллятора 32 МГц (HSI32M)',
  OSC32K: 'Частота внешего осциллятора 32 кГц (OSC32K)',
  LSI32K: 'Частота внутреннего осциллятора 32 кГц (LSI32K)',
};

function binarySearch(fn: (div: number) => number, targetValue: number, maxDifference = 500) {
  let min = 0;
  let max = 1024;
  let guess;

  const isIncreasing = fn(max) > fn(min);

  while (min <= max) {
    guess = Math.floor((max + min) / 2);
    const val = fn(guess);

    if (Math.abs(val - targetValue) < maxDifference) {
      return guess;
    }

    if (isIncreasing) {
      if (val < targetValue) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }
    } else if (val > targetValue) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return -1;
}

export const clockSourceTestCorrectness: Record<
  keyof typeof ClockSource,
  (freq: number, state: RootState) => null | [number, number]
> = {
  SYS_CLK: (freq, { system }) => {
    const source = system.pcc.systemSource;
    const fSystem = pccClockSourceFreq[source];

    const fn = (div: number) => fSystem / (2 * div + 2);
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
  HCLK: (freq, { system }) => {
    const source = system.pcc.systemSource;
    const fSystem = pccClockSourceFreq[source];
    const divAhb = system.pcc.ahb;

    const fn = (div: number) => fSystem / ((divAhb + 1) * (2 * div + 2));
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
  OSC32M: freq => {
    const fn = (div: number) => 32000000 / (2 * div + 2);
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
  HSI32M: freq => {
    const fn = (div: number) => 32000000 / (2 * div + 2);
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
  OSC32K: freq => {
    const fn = (div: number) => 32000 / (2 * div + 2);
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
  LSI32K: freq => {
    const fn = (div: number) => 32000 / (2 * div + 2);
    const closestDiv = binarySearch(fn, freq);

    const actualValue = fn(closestDiv);

    if (actualValue < 0 || actualValue > 100000) return null;
    return [closestDiv, actualValue];
  },
};

export const CLOCK_SOURCE_OPTIONS = (
  Object.keys(clockSourceTranslations) as (keyof typeof clockSourceTranslations)[]
).map<OptionShape>(e => ({
  key: clockSourceTranslations[e],
  value: ClockSource[e],
}));

export const tempStateSchema = z.object({
  enabled: z.boolean(),
  clockSource: z.nativeEnum(ClockSource),
  freq: zodStringToNumber(
    z
      .number({ required_error: 'Обязательное поле' })
      .min(0)
      .max(100 * 1000)
  ),
});

export type TempState = z.infer<typeof tempStateSchema>;

export const tempInitialState: TempState = {
  enabled: false,
  clockSource: ClockSource.SYS_CLK,
  freq: 0,
};

export const tempSlice = createSlice({
  name: 'temp',
  initialState: tempInitialState,
  reducers: {
    setTemp: (_, action: PayloadAction<TempState>) => ({ ...action.payload }),
  },
});

export const { setTemp } = tempSlice.actions;
