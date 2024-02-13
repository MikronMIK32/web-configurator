import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const tempStateSchema = z.object({
  enabled: z.boolean(),
});

export type TempState = z.infer<typeof tempStateSchema>;

export const tempInitialState: TempState = {
  enabled: false,
};

export const tempSlice = createSlice({
  name: 'temp',
  initialState: tempInitialState,
  reducers: {
    setTemp: (_, action: PayloadAction<TempState>) => ({ ...action.payload }),
  },
});

export const { setTemp } = tempSlice.actions;
