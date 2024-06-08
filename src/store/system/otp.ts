import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export enum ReadMode {
  TWO_STEPS = 'two-steps',
  THREE_STEPS = 'three-steps',
}

export const readModeOptions = [
  {
    key: 'Чтение в два этапа',
    value: ReadMode.TWO_STEPS,
  },
  {
    key: 'Чтение в три этапа',
    value: ReadMode.THREE_STEPS,
  },
];

export const otpStateSchema = z.object({
  enabled: z.boolean(),
  read_mode: z.nativeEnum(ReadMode),
});

export type OtpState = z.infer<typeof otpStateSchema>;

export const otpInitialState: OtpState = {
  read_mode: ReadMode.THREE_STEPS,
};

export const otpSlice = createSlice({
  name: 'otp',
  initialState: otpInitialState,
  reducers: {
    setOtp: (_, action: PayloadAction<OtpState>) => ({ ...action.payload }),
  },
});

export const { setOtp } = otpSlice.actions;
