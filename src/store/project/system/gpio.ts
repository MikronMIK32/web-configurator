import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const gpioStateSchema = z.object({
  enabled: z.boolean(),
});

export type GPIOState = z.infer<typeof gpioStateSchema>;

export const gpioInitialState: GPIOState = {
  enabled: false,
};

export const gpioSlice = createSlice({
  name: 'gpio',
  initialState: gpioInitialState,
  reducers: {
    setGPIO: (_, action: PayloadAction<GPIOState>) => ({ ...action.payload }),
  },
});

export const { setGPIO } = gpioSlice.actions;
