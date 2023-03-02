import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

import { OptionShape } from '@components/controls/NewSelect';

export enum EncryptionAlgo {
  KUZNECHIK = 'KUZNECHIK',
  MAGMA = 'MAGMA',
  AES = 'AES',
}

export const algoOptions: OptionShape[] = [
  {
    key: '«Кузнечик»',
    value: EncryptionAlgo.KUZNECHIK,
  },
  {
    key: '«Магма»',
    value: EncryptionAlgo.MAGMA,
  },
  {
    key: 'AES',
    value: EncryptionAlgo.AES,
  },
];

export enum EncryptionMode {
  ECB = 'ECB',
  CBC = 'CBC',
  CTR = 'CTR',
}

export const modeOptions: OptionShape[] = [
  {
    value: EncryptionMode.ECB,
    key: 'ECB',
  },
  {
    value: EncryptionMode.CBC,
    key: 'CBC',
  },
  {
    value: EncryptionMode.CTR,
    key: 'CTR',
  },
];

export enum WordPermutation {
  NORMAL = 'normal',
  HALF = 'half',
  BYTEWISE = 'bytewise',
  BITWISE = 'bitwise',
}

export const wordPermutationOptions: OptionShape[] = [
  {
    key: 'Нет перестановки',
    value: WordPermutation.NORMAL,
  },
  {
    key: 'Перестановка по полуслову',
    value: WordPermutation.HALF,
  },
  {
    key: 'Перестановки по байтам',
    value: WordPermutation.BYTEWISE,
  },
  {
    key: 'Перестановки по битам',
    value: WordPermutation.BITWISE,
  },
];

export enum WordOrder {
  LSB = 'lsb', // least significant byte first
  MSB = 'msb', // most significant byte first
}

export const wordOrderOptions: OptionShape[] = [
  {
    key: 'От младшего слова к старшему',
    value: WordOrder.LSB,
  },
  {
    key: 'От старшего слова к младшему.',
    value: WordOrder.MSB,
  },
];

export const cryptoStateSchema = z.object({
  enabled: z.boolean(),
  algorithm: z.nativeEnum(EncryptionAlgo, { required_error: 'Обязательное поле' }),
  mode: z.nativeEnum(EncryptionMode, { required_error: 'Обязательное поле' }),
  permutation: z.nativeEnum(WordPermutation, { required_error: 'Обязательное поле' }),
  order: z.nativeEnum(WordOrder, { required_error: 'Обязательное поле' }),
});

export type CryptoState = z.infer<typeof cryptoStateSchema>;

export const cryptoInitialState: CryptoState = {
  enabled: false,
  algorithm: EncryptionAlgo.KUZNECHIK,
  mode: EncryptionMode.ECB,
  permutation: WordPermutation.NORMAL,
  order: WordOrder.LSB,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: cryptoInitialState,
  reducers: {
    setCrypto: (_, action: PayloadAction<CryptoState>) => ({ ...action.payload }),
  },
});

export const { setCrypto } = cryptoSlice.actions;
