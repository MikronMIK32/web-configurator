import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export enum AdcChannel {
  CHANNEL_0 = 'channel_0',
  CHANNEL_1 = 'channel_1',
  CHANNEL_2 = 'channel_2',
  CHANNEL_3 = 'channel_3',
  CHANNEL_4 = 'channel_4',
  CHANNEL_5 = 'channel_5',
  CHANNEL_6 = 'channel_6',
  CHANNEL_7 = 'channel_7',
}

export enum VRef {
  INNER = 'inner',
  CALIBRATABLE = 'calibratable',
  ADC_REF = 'adc_ref',
}

export const adcStateSchema = z.object({
  enabled: z.boolean(),
  vRef: z.nativeEnum(VRef),
  channel: z.nativeEnum(AdcChannel),
});

export type AdcState = z.infer<typeof adcStateSchema>;

export const adcInitialState: AdcState = {
  enabled: false,
  channel: AdcChannel.CHANNEL_0,
  vRef: VRef.INNER,
};

export const adcSlice = createSlice({
  name: 'adc',
  initialState: adcInitialState,
  reducers: {
    setAdc: (_, action: PayloadAction<AdcState>) => ({ ...action.payload }),
  },
});

export const { setAdc } = adcSlice.actions;
