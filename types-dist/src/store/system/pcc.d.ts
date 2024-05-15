import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: any;
};
export declare enum PCCClockSource {
    OSC32M = "OSC32M",
    OSC32K = "OSC32K",
    HSI32M = "HSI32M",
    LSI32M = "LSI32M"
}
/**
 * Частоты в гц
 */
export declare const pccClockSourceFreq: Record<keyof typeof PCCClockSource, number>;
export declare const clockSourceOptions: OptionShape[];
export declare const systemSourceOptions: OptionShape[];
export declare enum MonitorClockSource {
    AUTO = "auto",
    OSC32K = "OSC32K",
    LSI32K = "LSI32K"
}
export declare const monitorClockSourceOptions: OptionShape[];
export declare const pccStateSchema: z.ZodObject<{
    clockSources: z.ZodArray<z.ZodNativeEnum<typeof PCCClockSource>, "many">;
    systemSource: z.ZodNativeEnum<typeof PCCClockSource>;
    forceSystemSource: z.ZodBoolean;
    monitorSource: z.ZodNativeEnum<typeof MonitorClockSource>;
    ahb: z.ZodEffects<z.ZodNumber, number, unknown>;
    apb_m: z.ZodEffects<z.ZodNumber, number, unknown>;
    ahb_p: z.ZodEffects<z.ZodNumber, number, unknown>;
    coeff_HSI32M: z.ZodEffects<z.ZodNumber, number, unknown>;
    coeff_LSI32K: z.ZodEffects<z.ZodNumber, number, unknown>;
}, "strip", z.ZodTypeAny, {
    clockSources: PCCClockSource[];
    systemSource: PCCClockSource;
    forceSystemSource: boolean;
    monitorSource: MonitorClockSource;
    ahb: number;
    apb_m: number;
    ahb_p: number;
    coeff_HSI32M: number;
    coeff_LSI32K: number;
}, {
    clockSources: PCCClockSource[];
    systemSource: PCCClockSource;
    forceSystemSource: boolean;
    monitorSource: MonitorClockSource;
    ahb?: unknown;
    apb_m?: unknown;
    ahb_p?: unknown;
    coeff_HSI32M?: unknown;
    coeff_LSI32K?: unknown;
}>;
export type PccState = z.infer<typeof pccStateSchema>;
export declare const pccInitialState: PccState;
export declare const pccSlice: import("@reduxjs/toolkit").Slice<{
    clockSources: PCCClockSource[];
    systemSource: PCCClockSource;
    forceSystemSource: boolean;
    monitorSource: MonitorClockSource;
    ahb: number;
    apb_m: number;
    ahb_p: number;
    coeff_HSI32M: number;
    coeff_LSI32K: number;
}, {
    setPcc: (_: import("immer/dist/internal").WritableDraft<{
        clockSources: PCCClockSource[];
        systemSource: PCCClockSource;
        forceSystemSource: boolean;
        monitorSource: MonitorClockSource;
        ahb: number;
        apb_m: number;
        ahb_p: number;
        coeff_HSI32M: number;
        coeff_LSI32K: number;
    }>, action: PayloadAction<PccState>) => {
        clockSources: PCCClockSource[];
        systemSource: PCCClockSource;
        forceSystemSource: boolean;
        monitorSource: MonitorClockSource;
        ahb: number;
        apb_m: number;
        ahb_p: number;
        coeff_HSI32M: number;
        coeff_LSI32K: number;
    };
}, "pcc">;
export declare const setPcc: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    clockSources: PCCClockSource[];
    systemSource: PCCClockSource;
    forceSystemSource: boolean;
    monitorSource: MonitorClockSource;
    ahb: number;
    apb_m: number;
    ahb_p: number;
    coeff_HSI32M: number;
    coeff_LSI32K: number;
}, string>;
export {};
