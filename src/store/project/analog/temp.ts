import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { PCCClockSource, pccClockSourceFreq } from '@store/project/system/pcc';

import { zodStringToNumber } from '@scripts/validations';

import { RootState } from '@store/index';

type OptionShape = { key: string; value: string };

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

function calculateOptimalDivider(
  clockSource: ClockSource,
  systemSource: PCCClockSource,
  divAhb: number,
  targetFreq: number
): { actualFreq: number; actualFreqAt: number } | null {
  const fSystem = pccClockSourceFreq[systemSource];

  // Function to calculate the frequency at a given divider
  const getValueAtDiv = (div: number): number => {
    switch (clockSource) {
      case ClockSource.SYS_CLK:
        return fSystem / (2 * (div + 1));

      case ClockSource.HCLK:
        return fSystem / ((divAhb + 1) * (2 * div + 2));

      case ClockSource.OSC32M:
      case ClockSource.HSI32M:
        return 32000000 / (2 * div + 2);

      case ClockSource.OSC32K:
      case ClockSource.LSI32K:
        return 32000 / (2 * div + 2);

      default:
        throw new Error('Invalid clock source');
    }
  };

  const MIN_FREQ = 32_000;
  const MAX_FREQ = 100_000;

  // Binary search bounds for the divider
  let low = 0;
  let high = 1_000_000; // Arbitrarily large upper bound for dividers

  let bestDiv = -1;
  let bestFreq = -1;
  let smallestDelta = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const freq = getValueAtDiv(mid);

    if (freq > MAX_FREQ) {
      // If the frequency is too high, increase the divider
      low = mid + 1;
    } else if (freq < MIN_FREQ) {
      // If the frequency is too low, decrease the divider
      high = mid - 1;
    } else {
      // Frequency is within bounds, check how close it is to the target
      const delta = Math.abs(freq - targetFreq);

      if (delta < smallestDelta) {
        // Update the best match
        smallestDelta = delta;
        bestDiv = mid;
        bestFreq = freq;
      }

      if (delta === 0) {
        // Exact match found, no need to continue
        break;
      } else if (freq > targetFreq) {
        // If the current frequency is higher than the target, increase the divider
        low = mid + 1;
      } else {
        // If the current frequency is lower than the target, decrease the divider
        high = mid - 1;
      }
    }
  }

  // Return the best result found
  if (bestDiv !== -1 && bestFreq !== -1) {
    return { actualFreq: bestFreq, actualFreqAt: bestDiv };
  }

  return null;
}

export const useFtSens = (clockSource: ClockSource, freq: number) => {
  // Redux selectors
  const systemSource = useSelector<RootState>(state => state.project.system.pcc.systemSource) as PCCClockSource;
  const divAhb = useSelector<RootState>(state => state.project.system.pcc.ahb) as number;

  return useMemo(
    () =>
      calculateOptimalDivider(clockSource, systemSource, divAhb, freq) || {
        actualFreq: null,
        actualFreqAt: null,
      },
    [freq, clockSource, systemSource, divAhb]
  );
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
      .min(0, 'Число должно быть положительным')
      .max(100 * 1000, 'Число должно быть менее 100 000')
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
