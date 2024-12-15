import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const busWdtStateSchema = z.object({
  enabled: z.boolean(),
});

export type BusWDTState = z.infer<typeof busWdtStateSchema>;

export const busWdtInitialState: BusWDTState = {
  enabled: false,
};

export const busWdtSlice = createSlice({
  name: 'bus-wdt',
  initialState: busWdtInitialState,
  reducers: {
    setBusWDT: (_, action: PayloadAction<BusWDTState>) => ({ ...action.payload }),
  },
});

export const { setBusWDT } = busWdtSlice.actions;
