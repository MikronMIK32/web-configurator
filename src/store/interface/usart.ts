import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const usartStateSchema = z.object({
  enabled: z.boolean(),
});

export type USARTState = z.infer<typeof usartStateSchema>;

export const usartInitialState: USARTState = {
  enabled: false,
};

export const usartSlice = createSlice({
  name: 'usart',
  initialState: usartInitialState,
  reducers: {
    setUSART: (_, action: PayloadAction<USARTState>) => ({ ...action.payload }),
  },
});

export const { setUSART } = usartSlice.actions;
