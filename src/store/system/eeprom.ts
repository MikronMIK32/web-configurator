import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { z } from 'zod';

export const EEPROM_MODE_OPTIONS = [
  { value: 0, key: 'Двухстадийный' },
  { value: 1, key: 'Трехстадийный' },
];

export const eepromStateSchema = z.object({
  enabled: z.boolean(),
  mode: z.number(),
});

export type EEPROMState = z.infer<typeof eepromStateSchema>;

export const eepromInitialState: EEPROMState = {
  enabled: false,
  mode: 0,
};

export const eepromSlice = createSlice({
  name: 'eeprom',
  initialState: eepromInitialState,
  reducers: {
    setEEPROM: (_, action: PayloadAction<EEPROMState>) => ({ ...action.payload }),
  },
});

export const { setEEPROM } = eepromSlice.actions;
