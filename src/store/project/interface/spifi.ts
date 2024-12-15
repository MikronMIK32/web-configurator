import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { zodStringToNumber } from '@scripts/validations';

type OptionShape = { key: string; value: string };

export enum SpifiInterface {
  SINGLE = 'single',
  QUAD = 'quad',
}

const spifiInterfaceTranslations: Record<SpifiInterface, string> = {
  [SpifiInterface.SINGLE]: 'Последовательный',
  [SpifiInterface.QUAD]: 'Dual',
};

export const SPIFI_INTERFACE_OPTIONS = (
  Object.keys(spifiInterfaceTranslations) as (keyof typeof spifiInterfaceTranslations)[]
).map<OptionShape>(e => ({
  key: spifiInterfaceTranslations[e],
  value: e,
}));

console.log(SpifiInterface, spifiInterfaceTranslations, SPIFI_INTERFACE_OPTIONS);

export enum InterfaceMode {
  MODE0 = 'mode0',
  MODE3 = 'mode3',
}

const interfaceModeTranslations: Record<InterfaceMode, string> = {
  [InterfaceMode.MODE0]: 'MODE0',
  [InterfaceMode.MODE3]: 'MODE3',
};

export const INTERFACE_MODE_OPTIONS = (
  Object.keys(interfaceModeTranslations) as (keyof typeof interfaceModeTranslations)[]
).map<OptionShape>(e => ({
  key: interfaceModeTranslations[e],
  value: e,
}));

export enum ClockEdge {
  FRONT = 'front',
  REAR = 'rear',
}

const clockEdgeTranslations: Record<ClockEdge, string> = {
  [ClockEdge.FRONT]: 'Передний фронт',
  [ClockEdge.REAR]: 'Задний фронт',
};

export const CLOCK_EDGE_OPTIONS = (
  Object.keys(clockEdgeTranslations) as (keyof typeof clockEdgeTranslations)[]
).map<OptionShape>(e => ({
  key: clockEdgeTranslations[e],
  value: e,
}));

export enum FeedbackClock {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

const feedbackClockTranslations: Record<FeedbackClock, string> = {
  [FeedbackClock.INTERNAL]: 'Внутренний',
  [FeedbackClock.EXTERNAL]: 'Внешний',
};

export const FEEDBACK_CLOCK_OPTIONS = (
  Object.keys(feedbackClockTranslations) as (keyof typeof feedbackClockTranslations)[]
).map<OptionShape>(e => ({
  key: feedbackClockTranslations[e],
  value: e,
}));

export const spifiStateSchema = z.object({
  enabled: z.boolean({ required_error: 'Обязательное поле' }),
  divider: zodStringToNumber(
    z
      .number({ required_error: 'Обязательное поле' })
      .min(0, { message: 'Значение должно быть более 0' })
      .max(15, { message: 'Значение должно быть менее 16' })
  ),
  interface: z.nativeEnum(SpifiInterface, { required_error: 'Обязательное поле' }),
  mode: z.nativeEnum(InterfaceMode, { required_error: 'Обязательное поле' }),
  clockEdge: z.nativeEnum(ClockEdge, { required_error: 'Обязательное поле' }),
  feedbackClock: z.nativeEnum(FeedbackClock, { required_error: 'Обязательное поле' }),
  timeout: zodStringToNumber(
    z
      .number({ required_error: 'Обязательное поле' })
      .min(0, { message: 'Значение должно быть более 0' })
      .max(0xffff, { message: 'Значение должно быть равно или меньше, чем 0xFFFF (65535)' })
  ),
  csDelay: zodStringToNumber(
    z
      .number({ required_error: 'Обязательное поле' })
      .min(1, { message: 'Значение должно быть более 1' })
      .max(16, { message: 'Значение должно быть равно, или менее 16' })
  ),
  interruptEnable: z.boolean(),
  dmaEnable: z.boolean(),
  cacheEnable: z.boolean(),
  dataCacheEnable: z.boolean(),
  prefetchEnable: z.boolean(),
  cacheLimit: zodStringToNumber(
    z
      .number({ required_error: 'Обязательное поле' })
      .min(0, { message: 'Значение должно быть более 0' })
      .max(0xffffffff, { message: 'Значение должно быть равно, или менее 0xFFFFFFFF (4294967295)' })
  ),
});

export type SpifiState = z.infer<typeof spifiStateSchema>;

export const spifiInitialState: SpifiState = {
  enabled: false,
  divider: 0,
  interface: SpifiInterface.SINGLE,
  mode: InterfaceMode.MODE0,
  clockEdge: ClockEdge.FRONT,
  feedbackClock: FeedbackClock.EXTERNAL,
  timeout: 0xffff,
  csDelay: 1,
  interruptEnable: false,
  dmaEnable: false,
  cacheEnable: true,
  dataCacheEnable: false,
  prefetchEnable: true,
  cacheLimit: 1,
};

export const spifiSlice = createSlice({
  name: 'spifi',
  initialState: spifiInitialState,
  reducers: {
    setSpifi: (_, action: PayloadAction<SpifiState>) => ({ ...action.payload }),
  },
});

export const { setSpifi } = spifiSlice.actions;
