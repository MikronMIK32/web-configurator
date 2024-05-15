import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: any;
};
export declare enum ClockSource {
    OSC32M = "OSC32M",
    HSI32M = "HSI32M",
    OSC32K = "OSC32K",
    HSI32K = "HSI32K"
}
export declare const CLOCK_SOURCE_OPTIONS: OptionShape[];
export declare const wdtStateSchema: z.ZodEffects<z.ZodObject<{
    enabled: z.ZodBoolean;
    clockSource: z.ZodNativeEnum<typeof ClockSource>;
    timeBeforeReload: z.ZodEffects<z.ZodNumber, number, unknown>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload: number;
}, {
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload?: unknown;
}>, {
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload: number;
}, {
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload?: unknown;
}>;
export type WDTState = z.infer<typeof wdtStateSchema>;
export declare const wdtInitialState: WDTState;
export declare const wdtSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload: number;
}, {
    setWDT: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        clockSource: ClockSource;
        timeBeforeReload: number;
    }>, action: PayloadAction<WDTState>) => {
        enabled: boolean;
        clockSource: ClockSource;
        timeBeforeReload: number;
    };
}, "wdt">;
export declare const setWDT: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    clockSource: ClockSource;
    timeBeforeReload: number;
}, string>;
export {};
