import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

enum UsartMode {
  DISABLED = 'disabled',
  ASYNC = 'async',
  SYNC = 'sync',
}

export enum CPol {
  ZERO = 'zero',
  ONE = 'one',
}

export enum CPha {
  RISE = 'rise',
  FALL = 'fall',
}

export enum ChannelMode {
  FULL_DUPLEX = 'full',
  HALF_DUPLEX = 'half',
}

export enum TransactionFormat {
  SEVEN_BIT = '7bit',
  EIGHT_BIT = '8bit',
  NINE_BIT = '9bit',
  SIX_BIT_PARITY = '6bit-parity',
  SEVEN_BIT_PARITY = '7bit-parity',
  EIGHT_BIT_PARITY = '8bit-parity',
}

export enum BitDirection {
  HIGH_FIRST = 'high-first',
  LOW_FIRST = 'low-first',
}

export enum StopBit {
  SINGLE = 'single',
  DOUBLE = 'double',
}

export const usartStateSchema = z.object({
  enabled: z.boolean(),
  mode: z.nativeEnum(UsartMode),
  cpol: z.nativeEnum(CPol),
  cpha: z.nativeEnum(CPha),
  lastBitLock: z.boolean(),
  channelMode: z.nativeEnum(ChannelMode),
  transactionFormat: z.nativeEnum(TransactionFormat),
  parityBitInversion: z.boolean(),
  dataInversion: z.boolean(),
  txInversion: z.boolean(),
  rxInversion: z.boolean(),
  bitDirection: z.nativeEnum(BitDirection),
  stopBit: z.nativeEnum(StopBit),
  swap: z.boolean(),
  lbm: z.boolean(),
  overwrite: z.boolean(),
});

export type USARTState = z.infer<typeof usartStateSchema>;

export const usartInitialState: USARTState = {
  enabled: false,
  mode: UsartMode.DISABLED,
  cpol: CPol.ZERO,
  cpha: CPha.RISE,
  lastBitLock: false,
  channelMode: ChannelMode.FULL_DUPLEX,
  transactionFormat: TransactionFormat.SEVEN_BIT,
  parityBitInversion: false,
  dataInversion: false,
  txInversion: false,
  rxInversion: false,
  bitDirection: BitDirection.HIGH_FIRST,
  stopBit: StopBit.SINGLE,
  swap: false,
  lbm: false,
  overwrite: false,
};

export const usartSlice = createSlice({
  name: 'usart',
  initialState: usartInitialState,
  reducers: {
    setUSART: (_, action: PayloadAction<USARTState>) => ({ ...action.payload }),
  },
});

export const { setUSART } = usartSlice.actions;
