import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

import { zodStringToNumber } from '@scripts/validations';

type OptionShape = { key: string; value: string };

export enum ExtraAddressMask {
  NO_MASK = 'no-mask',
  SEVEN_TWO = '7-2',
  SEVEN_THREE = '7-3',
  SEVEN_FOUR = '7-4',
  SEVEN_FIVE = '7-5',
  SEVEN_SIX = '7-6',
  SEVEN = '7',
  ALL_UNRESERVED = 'all-unreserved',
}

const extraAddressMaskTranslations: Record<keyof typeof ExtraAddressMask, string> = {
  NO_MASK: 'Нет маски',
  SEVEN_TWO: 'Сравнивается 7-2 бит адреса',
  SEVEN_THREE: 'Сравнивается 7-3 бит адреса',
  SEVEN_FOUR: 'Сравнивается 7-4 бит адреса',
  SEVEN_FIVE: 'Сравнивается 7-5 бит адреса',
  SEVEN_SIX: 'Сравнивается 7-6 бит адреса',
  SEVEN: 'Сравнивается 7-й бит адреса',
  ALL_UNRESERVED: 'Все адреса, кроме зарезервированных',
};

export const EXTRA_ADDRESS_MASK_OPTIONS = (
  Object.keys(extraAddressMaskTranslations) as (keyof typeof extraAddressMaskTranslations)[]
).map<OptionShape>(e => ({
  key: extraAddressMaskTranslations[e],
  value: ExtraAddressMask[e],
}));

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

const commonFreqSchema = z.object({
  preliminaryDivider: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(15)),
  scldelDuration: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(15)),
  sdadelDuration: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(15)),
});

const commonSchema = z.object({
  digitalFilter: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(15)),
  analogFilter: z.boolean({ required_error: 'Обязательное поле' }),
  frequency: commonFreqSchema,
});

const disabledSchema = commonSchema.extend({
  mode: z.literal(modeEnum.enum.DISABLED),
});

const masterSchema = commonSchema.extend({
  mode: z.literal(modeEnum.enum.MASTER),
  autoEnd: z.boolean({ required_error: 'Обязательное поле' }),
  frequency: commonFreqSchema.extend({
    sclHoldOneDuration: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(255)),
    sclHoldZeroDuration: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(255)),
  }),
});

const slaveSchema = z.object({
  mode: z.literal(modeEnum.enum.SLAVE),
  stretchClockSingal: z.boolean({ required_error: 'Обязательное поле ' }).nullable(),
  allowSharedAddress: z.boolean({ required_error: 'Обязательное поле' }),
  controlAck: z.boolean({ required_error: 'Обязательное поле' }),
  frequency: commonFreqSchema,
  extraAddressEnabled: z.boolean(),
  mainAddress: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0).max(1023)),
  extraAddress: zodStringToNumber(z.number({ required_error: 'Обязательное поле' }).min(0)).nullable(),
  extraAddressMask: z
    .nativeEnum(ExtraAddressMask, {
      invalid_type_error: 'Обязательное поле',
    })
    .nullable(),
});

const union = z.union([disabledSchema, masterSchema, slaveSchema]);

export const i2cStateSchema = z
  .discriminatedUnion('mode', [disabledSchema, masterSchema, slaveSchema])
  .refine(
    val => {
      if (val.mode !== Mode.SLAVE) return true;
      if (!val.extraAddressEnabled) return true;

      return val.extraAddress !== null && val.extraAddress !== undefined;
    },
    {
      path: ['extraAddress'],
      message: 'Обязательное поле',
    }
  )
  .refine(
    val => {
      if (val.mode !== Mode.SLAVE) return true;

      const hasExtra = val.extraAddressEnabled;
      if (!hasExtra) return true;

      return val.mainAddress <= 127;
    },
    {
      path: ['mainAddress'],
      message: 'Основной адрес не может быть числом больше 127 при наличии дополнительного адреса',
    }
  )
  .refine(
    val => {
      if (val.mode !== Mode.SLAVE) return true;

      if (!val.extraAddressEnabled) return true;
      if (val.extraAddressMask === ExtraAddressMask.NO_MASK) return true;

      if (val.extraAddress === null) return false;

      return val.extraAddress >= 7 && val.extraAddress <= 120;
    },
    {
      path: ['extraAddress'],
      message: 'Значение должно быть между 7 и 120, т.к. 0b1111XXX, 0b0000XXX - зарезервированные адреса',
    }
  );

export type I2CState = z.infer<typeof union>;

export const initialState: I2CState = {
  mode: Mode.DISABLED,
  analogFilter: false,
  digitalFilter: 0,
  frequency: {
    preliminaryDivider: 0,
    sdadelDuration: 0,
    scldelDuration: 0,
  },
};

export const masterInitialState: I2CState = {
  mode: Mode.MASTER,
  analogFilter: false,
  digitalFilter: 0,
  autoEnd: false,
  frequency: {
    preliminaryDivider: 0,
    sdadelDuration: 0,
    scldelDuration: 0,
    sclHoldOneDuration: 0,
    sclHoldZeroDuration: 0,
  },
};

export const slaveInitialState: I2CState = {
  mode: Mode.SLAVE,
  allowSharedAddress: false,
  controlAck: false,
  extraAddressEnabled: false,
  mainAddress: 0,
  stretchClockSingal: false,
  extraAddress: 0,
  extraAddressMask: ExtraAddressMask.NO_MASK,
  frequency: {
    preliminaryDivider: 0,
    sdadelDuration: 0,
    scldelDuration: 0,
  },
};

export const i2cSlice = createSlice({
  name: 'i2c',
  initialState: {
    i2c0: { ...(initialState as I2CState) },
    i2c1: { ...(initialState as I2CState) },
  },
  reducers: {
    setI2C0: (old, action: PayloadAction<I2CState>) => ({
      ...old,
      i2c0: action.payload,
    }),
    setI2C1: (old, action: PayloadAction<I2CState>) => ({
      ...old,
      i2c1: action.payload,
    }),
  },
});

export const { setI2C0, setI2C1 } = i2cSlice.actions;
