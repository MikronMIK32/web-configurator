import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

import { VRef } from './adc';

export { VRef };

export enum DacChannel {
  CHANNEL_1 = 'channel_1',
  CHANNEL_2 = 'channel_2',
}

export const dacStateSchema = z.object({
  enabled: z.boolean(),
  vRef: z.nativeEnum(VRef),
  channel: z.nativeEnum(DacChannel),
  divider: z.number({ invalid_type_error: 'Обязательное поле', required_error: 'Обязательное поле' }),
});

export type DacState = z.infer<typeof dacStateSchema>;

export const dacInitialState: DacState = {
  enabled: false,
  channel: DacChannel.CHANNEL_1,
  vRef: VRef.INNER,
  divider: 0,
};

export const dacSlice = createSlice({
  name: 'dac',
  initialState: dacInitialState,
  reducers: {
    setDac: (_, action: PayloadAction<DacState>) => ({ ...action.payload }),
  },
});

export const { setDac } = dacSlice.actions;
