import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const wdtStateSchema = z.object({
  enabled: z.boolean(),
});

export type WDTState = z.infer<typeof wdtStateSchema>;

export const wdtInitialState: WDTState = {
  enabled: false,
};

export const wdtSlice = createSlice({
  name: 'wdt',
  initialState: wdtInitialState,
  reducers: {
    setWDT: (_, action: PayloadAction<WDTState>) => ({ ...action.payload }),
  },
});

export const { setWDT } = wdtSlice.actions;
