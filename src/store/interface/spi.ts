import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

export enum TickPhase {
  ACTIVE_OUTSIDE = 'active-outside',
  INACTIVE_OUTSIDE = 'inactive-outside',
}

export const tickPhaseOptions: OptionShape[] = [
  {
    key: 'Тактовая частота активна вне слова',
    value: TickPhase.ACTIVE_OUTSIDE,
  },
  {
    key: 'Тактовая частота неактивна вне слова',
    value: TickPhase.INACTIVE_OUTSIDE,
  },
];

export enum TickPolarity {
  LOW = 'low',
  HIGH = 'high',
}

export const tickPolarityOptions: OptionShape[] = [
  {
    key: 'Тактовый сигнал удерживается на низком уровне',
    value: TickPolarity.LOW,
  },
  {
    key: 'Тактовый сигнал удерживается на высоком уровне',
    value: TickPolarity.HIGH,
  },
];

export enum PeripheralDecoder {
  ONE_OF_FOUR = 'one-of-four',
  EXTERNAL = 'external',
}

enum InternalDevice {
  ONE,
  TWO,
  THREE,
  FOUR,
}

export const internalDecoderDeviceOptions: OptionShape[] = [
  {
    key: 'Устройство №1',
    value: InternalDevice.ONE,
  },
  {
    key: 'Устройство №2',
    value: InternalDevice.TWO,
  },
  {
    key: 'Устройство №3',
    value: InternalDevice.THREE,
  },
  {
    key: 'Устройство №4',
    value: InternalDevice.FOUR,
  },
];

export const peripheralDecoderOptions: OptionShape[] = [
  {
    key: 'Выбор 1 из 4 устройств',
    value: PeripheralDecoder.ONE_OF_FOUR,
  },
  {
    key: 'Внешний декодер',
    value: PeripheralDecoder.EXTERNAL,
  },
];

export enum SlaveSignalControl {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export const slaveSignalControlOptions: OptionShape[] = [
  {
    key: 'Автоматический',
    value: SlaveSignalControl.AUTO,
  },
  {
    key: 'Ручной',
    value: SlaveSignalControl.MANUAL,
  },
];

export const dividerOptions: OptionShape[] = [4, 8, 16, 32, 64, 128, 256].map(e => ({
  key: `${e}`,
  value: e,
}));

export const txThresholdOptions: OptionShape[] = [1, 2, 3, 4, 5, 6, 7, 8].map(e => ({
  key: `${e}`,
  value: e,
}));

export enum Slave {
  NONE = 'none',
  CS0 = 'CS0',
  CS1 = 'CS1',
  CS2 = 'CS2',
  CS3 = 'CS3',
}

export const slaveOptions: OptionShape[] = [
  {
    key: 'Не выбрано',
    value: Slave.NONE,
  },
  {
    key: 'Устройство 1',
    value: Slave.CS0,
  },
  {
    key: 'Устройство 2',
    value: Slave.CS1,
  },
  {
    key: 'Устройство 3',
    value: Slave.CS2,
  },
  {
    key: 'Устройство 4',
    value: Slave.CS3,
  },
];

export enum Mode {
  DISABLED = 'disabled',
  MASTER = 'master',
  SLAVE = 'slave',
}

export const modeOptions: OptionShape[] = [
  {
    key: 'Выключен',
    value: Mode.DISABLED,
  },
  {
    key: 'Ведущий',
    value: Mode.MASTER,
  },
  {
    key: 'Ведомый',
    value: Mode.SLAVE,
  },
];

const modeEnum = z.nativeEnum(Mode, { required_error: 'Обязательное поле' });

const commonSchema = z.object({
  tickPhase: z.nativeEnum(TickPhase, { required_error: 'Обязательное поле' }),
  tickPolarity: z.nativeEnum(TickPolarity, { required_error: 'Обязательное поле' }),
  txThreshold: z.number({ required_error: 'Обязательное поле' }),
});

const disabledSchema = commonSchema.extend({
  mode: z.literal(modeEnum.enum.DISABLED),
});

const externalDecoderSchema = z.object({
  peripheralDecoder: z.literal(PeripheralDecoder.EXTERNAL),
  externalDecoderValue: z
    .number({ required_error: 'Обязательное поле' })
    .min(0, {
      message: 'Введите число',
    })
    .max(15, {
      message: 'Число должно быть менее 16 (4-битное)',
    }),
});

const internalDecoderSchema = z.object({
  peripheralDecoder: z.literal(PeripheralDecoder.ONE_OF_FOUR),
  internalDecoderDevice: z.nativeEnum(InternalDevice, { required_error: 'Обязательное поле' }),
});

const decoderUnion = z.discriminatedUnion('peripheralDecoder', [externalDecoderSchema, internalDecoderSchema]);

const masterSchema = commonSchema.extend({
  mode: z.literal(modeEnum.enum.MASTER),
  divider: z.number({ required_error: 'Обязательное поле' }),

  peripheralDecoder: z.nativeEnum(PeripheralDecoder, { required_error: 'Обязательное поле' }).optional(),
  slaveSignalControl: z.nativeEnum(SlaveSignalControl, { required_error: 'Обязательное поле' }).optional(),
  slave: z.nativeEnum(Slave, { required_error: 'Обязательное поле' }).optional(),
});

const slaveSchema = commonSchema.extend({
  mode: z.literal(modeEnum.enum.SLAVE),
});

const union = z.union([disabledSchema, masterSchema, slaveSchema]);

export const spiStateSchema = z
  .discriminatedUnion('mode', [disabledSchema, masterSchema, slaveSchema])
  .and(decoderUnion);

export type SpiState = z.infer<typeof union>;

export const spiInitialState: SpiState = {
  mode: Mode.DISABLED,
  tickPhase: TickPhase.ACTIVE_OUTSIDE,
  tickPolarity: TickPolarity.LOW,
  txThreshold: 1,
};

export const spiInitialStateMaster: Omit<z.infer<typeof masterSchema>, keyof z.infer<typeof commonSchema>> = {
  mode: Mode.MASTER,
  peripheralDecoder: PeripheralDecoder.ONE_OF_FOUR,
  slaveSignalControl: SlaveSignalControl.AUTO,
  slave: Slave.NONE,
  divider: 4,
};

export const spiSlice = createSlice({
  name: 'spi',
  initialState: {
    spi0: { ...(spiInitialState as SpiState) },
    spi1: { ...(spiInitialState as SpiState) },
  },
  reducers: {
    setSpi0: (old, action: PayloadAction<SpiState>) => ({
      ...old,
      spi0: action.payload,
    }),
    setSpi1: (old, action: PayloadAction<SpiState>) => ({
      ...old,
      spi1: action.payload,
    }),
  },
});

export const { setSpi0, setSpi1 } = spiSlice.actions;
