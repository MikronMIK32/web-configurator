import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { VRef } from './adc';
export { VRef };
export declare enum DacChannel {
    CHANNEL_1 = "channel_1",
    CHANNEL_2 = "channel_2"
}
export declare const dacStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    vRef: z.ZodNativeEnum<typeof VRef>;
    channel: z.ZodNativeEnum<typeof DacChannel>;
    divider: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    vRef: VRef;
    channel: DacChannel;
    divider: number;
}, {
    enabled: boolean;
    vRef: VRef;
    channel: DacChannel;
    divider: number;
}>;
export type DacState = z.infer<typeof dacStateSchema>;
export declare const dacInitialState: DacState;
export declare const dacSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    vRef: VRef;
    channel: DacChannel;
    divider: number;
}, {
    setDac: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        vRef: VRef;
        channel: DacChannel;
        divider: number;
    }>, action: PayloadAction<DacState>) => {
        enabled: boolean;
        vRef: VRef;
        channel: DacChannel;
        divider: number;
    };
}, "dac">;
export declare const setDac: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    vRef: VRef;
    channel: DacChannel;
    divider: number;
}, string>;
