import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

export enum Timer16Mode {
  DISABLED = 'disabled',
  INTERNAL_CLOCK = 'internal_clock',
  EXTERNAL_CLOCK_SYNC = 'external_clock_sync',
  EXTERNAL_CLOCK = 'external_clock',
  ENCODER = 'encoder',
}

export enum Timer16Polarity {
  RISE = 'rise',
  FALL = 'fall',
  BOTH = 'both',
}

export const timerPolarityTranslations: Record<Timer16Polarity, string> = {
  rise: 'Восходящий фронт',
  fall: 'Нисходящий фронт',
  both: 'Оба фронта (требуется частота внутреннего тактового сигнала в 4 раза больше частоты внешнего сигнала)',
};

export const timerPolarityOptions = Object.keys(timerPolarityTranslations).map(value => ({
  value,
  key: timerPolarityTranslations[value as Timer16Polarity],
}));

export enum Timer16UpdateMode {
  IMMEDIATE = 'immediate',
  AFTER_PERIOD = 'after_period',
}

export enum Timer16WavePolarity {
  FORWARD = 'forward',
  INVERTED = 'inverted',
}

export enum Timer16DigitalFilter {
  DISABLED = 'disabled',
  STABLE_TWO_CYCLES = 'stable_two_cycles',
  STABLE_FOUR_CYCLES = 'stable_four_cycles',
  STABLE_EIGHT_CYCLES = 'stable_eight_cycles',
}

export enum TriggerSource {
  SOFTWARE_TRIGGER = 'software_trigger',
  THERMO_END = 'thermo_end',
  ADC_END = 'adc_end',
  RTC = 'rtc',
  ALARM = 'alarm',
}

export const timerDigitalFilterTranslations: Record<Timer16DigitalFilter, string> = {
  disabled: 'Выключено',
  stable_two_cycles: 'Активный уровень стабилен 2 такта',
  stable_four_cycles: 'Активный уровень стабилен 4 такта',
  stable_eight_cycles: 'Активный уровень стабилен 8 такта',
};

export const timerModeTranslations: Record<Timer16Mode, string> = {
  disabled: 'Выключено',
  internal_clock: 'Счет от внутреннего источника',
  external_clock_sync: 'Счёт от внешнего источника с внутренней синхронизацией',
  encoder: 'Режим энкодера',
  external_clock: 'Счёт от внешнего источника',
};

export const timerTriggerPolarityTranslations: Record<Timer16Polarity, string> = {
  rise: 'Восходящий фронт',
  fall: 'Нисходящий фронт',
  both: 'Оба фронта',
};

export const timerDigitalFilterOptions = Object.keys(timerDigitalFilterTranslations).map(value => ({
  value,
  key: timerDigitalFilterTranslations[value as Timer16DigitalFilter],
}));

export const activeFrontOptions = Object.keys(timerTriggerPolarityTranslations).map(value => ({
  value,
  key: timerTriggerPolarityTranslations[value as Timer16Polarity],
}));

export const timerModeOptions = Object.keys(timerModeTranslations).map(value => ({
  value,
  key: timerModeTranslations[value as Timer16Mode],
}));

const dividers = [1, 2, 4, 8, 16, 32, 64, 128];

// disabled при mode === Timer16State.EXTERNAL_CLOCK_SYNC
export const dividerOptions = dividers.map(e => ({
  key: `Деление на ${e}`,
  value: e,
}));

export const updateModeTranslations: Record<Timer16UpdateMode, string> = {
  immediate: 'Обновить сразу',
  after_period: 'Обновить в конце периода',
};

export const updateModeOptions = Object.keys(updateModeTranslations).map(value => ({
  value,
  key: updateModeTranslations[value as Timer16UpdateMode],
}));

export const wavePolarityTranslations: Record<Timer16WavePolarity, string> = {
  forward: 'Прямой сигнал',
  inverted: 'Инвертированный сигнал',
};

export const wavePolarityOptions = Object.keys(wavePolarityTranslations).map(value => ({
  value,
  key: wavePolarityTranslations[value as Timer16WavePolarity],
}));

const timerSpecifics = new Map<number, string[]>();
timerSpecifics.set(0, ['GPIO0_7', 'GPIO0_4', 'GPIO0_15', 'GPIO0_14']);
timerSpecifics.set(1, ['GPIO1_9', 'GPIO1_8', 'GPIO1_7', 'GPIO1_6']);
timerSpecifics.set(2, ['GPIO2_3', 'GPIO2_8', 'GPIO2_1', 'GPIO2_0']);

export const getTriggerSourceOptions = (timerNumber: 0 | 1 | 2, isSoftwareDisabled: boolean): OptionShape[] => {
  const timerSpecific = timerSpecifics.get(timerNumber);
  if (!timerSpecific) {
    throw new Error(`Unresolved timer number ${timerNumber}`);
  }

  const specificOptions = timerSpecific.map(e => ({
    key: e,
    value: e,
  }));

  return [
    ...specificOptions,
    ...(isSoftwareDisabled
      ? []
      : [
          {
            key: 'Программный',
            value: 'software_trigger',
          },
        ]),
    {
      key: 'Окончание преобразования термосенсора',
      value: 'thermo_end',
    },
    {
      key: 'Окончание преобразования АЦП',
      value: 'adc_end',
    },
    {
      key: 'Прерывание RTC',
      value: 'rtc',
    },
    {
      key: 'Будильник',
      value: 'alarm',
    },
  ];
};

export const timer16StateSchema = z.object({
  mode: z.nativeEnum(Timer16Mode),
  externalTrigger: z.boolean(),
  generateWaveForm: z.boolean(),

  frequency: z.object({
    divider: z.number(),
    polarity: z.nativeEnum(Timer16Polarity),
  }),
  updateMode: z.nativeEnum(Timer16UpdateMode),
  triggerSource: z.nativeEnum(TriggerSource),
  activeFront: z.nativeEnum(Timer16Polarity),
  wavePolarity: z.nativeEnum(Timer16WavePolarity),

  triggerDigitalFilter: z.nativeEnum(Timer16DigitalFilter),
});

export type Timer16State = z.infer<typeof timer16StateSchema>;

export const timer16InitialState: Timer16State = {
  mode: Timer16Mode.DISABLED,
  externalTrigger: false,
  generateWaveForm: false,
  triggerDigitalFilter: Timer16DigitalFilter.DISABLED,

  frequency: {
    divider: 1,
    polarity: Timer16Polarity.RISE,
  },

  updateMode: Timer16UpdateMode.IMMEDIATE,
  triggerSource: TriggerSource.SOFTWARE_TRIGGER,
  activeFront: Timer16Polarity.RISE,
  wavePolarity: Timer16WavePolarity.FORWARD,
};

export const timer16Slice = createSlice({
  name: 'timer16',
  initialState: {
    timer16_0: timer16InitialState,
    timer16_1: timer16InitialState,
    timer16_2: timer16InitialState,
  },
  reducers: {
    setTimer16_0: (old, action: PayloadAction<Timer16State>) => ({ ...old, timer16_0: action.payload }),
    setTimer16_1: (old, action: PayloadAction<Timer16State>) => ({ ...old, timer16_1: action.payload }),
    setTimer16_2: (old, action: PayloadAction<Timer16State>) => ({ ...old, timer16_2: action.payload }),
  },
});

export const { setTimer16_0, setTimer16_1, setTimer16_2 } = timer16Slice.actions;
