import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const pdpStateSchema = z.object({
  enabled: z.boolean(),
});

export type PDPState = z.infer<typeof pdpStateSchema>;

export const pdpInitialState: PDPState = {
  enabled: false,
};

export const pdpSlice = createSlice({
  name: 'pdp',
  initialState: pdpInitialState,
  reducers: {
    setPDP: (_, action: PayloadAction<PDPState>) => ({ ...action.payload }),
  },
});

export const { setPDP } = pdpSlice.actions;
