import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: string;
};
export declare enum ClockSource {
    SYS_CLK = "SYS_CLK",
    HCLK = "HCLK",
    OSC32M = "OSC32M",
    HSI32M = "HSI32M",
    OSC32K = "OSC32K",
    LSI32K = "LSI32K"
}
export declare const useFreqencyCorrection: (clockSource: ClockSource, freq: number) => {
    actualFreq: number | null;
    actualFreqAt: number | null;
    isRunning: boolean;
};
export declare const CLOCK_SOURCE_OPTIONS: OptionShape[];
export declare const tempStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    clockSource: z.ZodNativeEnum<typeof ClockSource>;
    freq: z.ZodEffects<z.ZodNumber, number, unknown>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    clockSource: ClockSource;
    freq: number;
}, {
    enabled: boolean;
    clockSource: ClockSource;
    freq?: unknown;
}>;
export type TempState = z.infer<typeof tempStateSchema>;
export declare const tempInitialState: TempState;
export declare const tempSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    clockSource: ClockSource;
    freq: number;
}, {
    setTemp: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        clockSource: ClockSource;
        freq: number;
    }>, action: PayloadAction<TempState>) => {
        enabled: boolean;
        clockSource: ClockSource;
        freq: number;
    };
}, "temp">;
export declare const setTemp: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    clockSource: ClockSource;
    freq: number;
}, string>;
export {};
