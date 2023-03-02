import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export const CRC_DB = {
  'CRC-32/zlib': {
    poly: 0x4C11DB7,
    init: 0xFFFFFFFF,
    refIn: true,
    refOut: true,
    xorOut: '0xFFFFFFFF',
    check: 0xCBF43926,
  },
  'CRC-32/BZIP2': {
    poly: 0x4C11DB7,
    init: 0xFFFFFFFF,
    refIn: false,
    refOut: false,
    xorOut: '0xFFFFFFFF',
    check: 0xFC891918,
  },
  'CRC-32C': {
    poly: 0x1EDC6F41,
    init: 0xFFFFFFFF,
    refIn: true,
    refOut: true,
    xorOut: '0xFFFFFFFF',
    check: 0xE3069283,
  },
  'CRC-32D': {
    poly: 0xA833982B,
    init: 0xFFFFFFFF,
    refIn: true,
    refOut: true,
    xorOut: '0xFFFFFFFF',
    check: 0x87315576,
  },
  'CRC-32/MPEG-2': {
    poly: 0x4C11DB7,
    init: 0xFFFFFFFF,
    refIn: false,
    refOut: false,
    xorOut: '0x00000000',
    check: 0x376E6E7,
  },
  'CRC-32/POSIX': {
    poly: 0x4C11DB7,
    init: 0x0,
    refIn: false,
    refOut: false,
    xorOut: '0xFFFFFFFF',
    check: 0x765E7680,
  },
  'CRC-32Q': {
    poly: 0x814141AB,
    init: 0x0,
    refIn: false,
    refOut: false,
    xorOut: '0x00000000',
    check: 0x3010BF7F,
  },
  'CRC-32/JAMCRC': {
    poly: 0x4C11DB7,
    init: 0xFFFFFFFF,
    refIn: true,
    refOut: true,
    xorOut: '0x00000000',
    check: 0x340BC6D9,
  },
  'CRC-32/XFER': {
    poly: 0xAF,
    init: 0x0,
    refIn: false,
    refOut: false,
    xorOut: '0x00000000',
    check: 0xBD0BE338,
  },
} as const;
export type CRC_NAMES_TYPE = keyof typeof CRC_DB;
export const KNOWN_CRC_NAMES = Object.keys(CRC_DB);

export const crcStateSchema = z.object({
  enabled: z.boolean(),
  algorithm: z.custom<'CUSTOM' | CRC_NAMES_TYPE>(val => {
    if (typeof val !== 'string') return false;

    if (val === 'CUSTOM') return true;

    return KNOWN_CRC_NAMES.includes(val);
  }),

  // TODO: hex validation in here?
  poly: z.number({ invalid_type_error: 'Введите корректное число'}),
  init: z.number({ invalid_type_error: 'Введите корректное число'}),
  xorOut: z.string().min(3, 'Введите корректное 16-ричное число'),

  refIn: z.boolean(),
  refOut: z.boolean(),
});

export type CrcState = z.infer<typeof crcStateSchema>;

export const crcInitialState: CrcState = {
  enabled: false,
  algorithm: 'CUSTOM',
  init: 0,
  poly: 0,
  xorOut: '0x00000000',
  refIn: false,
  refOut: false,
};

export const crcSlice = createSlice({
  name: 'crc',
  initialState: crcInitialState,
  reducers: {
    setCrc: (_, action: PayloadAction<CrcState>) => ({ ...action.payload }),
  },
});

export const { setCrc } = crcSlice.actions;
