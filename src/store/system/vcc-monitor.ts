import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const vccMonitorStateSchema = z.object({
  enabled: z.boolean(),
});

export type VccMonitorState = z.infer<typeof vccMonitorStateSchema>;

export const vccMonitorInitialState: VccMonitorState = {
  enabled: false,
};

export const vccMonitorSlice = createSlice({
  name: 'vcc-monitor',
  initialState: vccMonitorInitialState,
  reducers: {
    setVccMonitor: (_, action: PayloadAction<VccMonitorState>) => ({ ...action.payload }),
  },
});

export const { setVccMonitor } = vccMonitorSlice.actions;
