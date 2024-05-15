import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { PCCClockSource, pccClockSourceFreq } from '@store/system/pcc';

import { ChunkIterator } from '@scripts/chunkIterator';
import { zodStringToNumber } from '@scripts/validations';

import { RootState } from '..';

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

export const useFreqencyCorrection = (clockSource: ClockSource, freq: number) => {
  const systemSource = useSelector<RootState>(state => state.system.pcc.systemSource) as PCCClockSource;
  const divAhb = useSelector<RootState>(state => state.system.pcc.ahb) as number;

  const [isRunning, setRunning] = useState(false);
  const [actualFreq, setActualFreq] = useState<number | null>(null);
  const [actualFreqAt, setActualFreqAt] = useState<number | null>(null);

  const fSystem = pccClockSourceFreq[systemSource];

  const workingResults = useRef<{
    minDifference: number;
    minDifferenceAt: null | number;
  }>({
    minDifference: Infinity,
    minDifferenceAt: null,
  });

  const freqRef = useRef(freq);
  freqRef.current = freq;

  const getValueAtDiv = useCallback(
    (div: number) => {
      switch (clockSource) {
        case ClockSource.SYS_CLK: {
          return fSystem / (2 * div + 2);
        }

        case ClockSource.HCLK: {
          return fSystem / ((divAhb + 1) * (2 * div + 2));
        }

        case ClockSource.OSC32M:
        case ClockSource.HSI32M:
          return 32000000 / (2 * div + 2);

        case ClockSource.OSC32K:
        case ClockSource.LSI32K:
          return 32000 / (2 * div + 2);

        default:
          return null;
      }
    },
    [clockSource, divAhb, fSystem]
  );

  const valueGetterRef = useRef(getValueAtDiv);
  valueGetterRef.current = getValueAtDiv;

  const executor = (iteration: number) => {
    const value = valueGetterRef.current(iteration);

    if (value === null) return;

    const delta = Math.abs(value - Number(freqRef.current));

    if (delta < workingResults.current.minDifference) {
      workingResults.current.minDifference = delta;
      workingResults.current.minDifferenceAt = iteration;
    }
  };

  const onFinish = () => {
    // console.log('result div =', workingResults.current.minDifferenceAt);

    setRunning(false);
    setActualFreqAt(workingResults.current.minDifferenceAt);
    setActualFreq(getValueAtDiv(workingResults.current.minDifferenceAt!));

    workingResults.current.minDifference = Infinity;
    workingResults.current.minDifferenceAt = null;
  };

  const chunkIteratorRef = useRef<ChunkIterator>(new ChunkIterator(executor, onFinish, 1024));

  useEffect(() => {
    setRunning(true);

    chunkIteratorRef.current.reset();
    chunkIteratorRef.current.iterate();
  }, [clockSource, freq]);

  return { actualFreq, actualFreqAt, isRunning };
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
