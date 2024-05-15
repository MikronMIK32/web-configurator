import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare enum AdcChannel {
    CHANNEL_0 = "channel_0",
    CHANNEL_1 = "channel_1",
    CHANNEL_2 = "channel_2",
    CHANNEL_3 = "channel_3",
    CHANNEL_4 = "channel_4",
    CHANNEL_5 = "channel_5",
    CHANNEL_6 = "channel_6",
    CHANNEL_7 = "channel_7"
}
export declare enum VRef {
    INNER = "inner",
    CALIBRATABLE = "calibratable",
    ADC_REF = "adc_ref"
}
export declare const adcStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    vRef: z.ZodNativeEnum<typeof VRef>;
    channel: z.ZodNativeEnum<typeof AdcChannel>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    vRef: VRef;
    channel: AdcChannel;
}, {
    enabled: boolean;
    vRef: VRef;
    channel: AdcChannel;
}>;
export type AdcState = z.infer<typeof adcStateSchema>;
export declare const adcInitialState: AdcState;
export declare const adcSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    vRef: VRef;
    channel: AdcChannel;
}, {
    setAdc: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        vRef: VRef;
        channel: AdcChannel;
    }>, action: PayloadAction<AdcState>) => {
        enabled: boolean;
        vRef: VRef;
        channel: AdcChannel;
    };
}, "adc">;
export declare const setAdc: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    vRef: VRef;
    channel: AdcChannel;
}, string>;
