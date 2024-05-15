import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const gpioStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type GPIOState = z.infer<typeof gpioStateSchema>;
export declare const gpioInitialState: GPIOState;
export declare const gpioSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
}, {
    setGPIO: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
    }>, action: PayloadAction<GPIOState>) => {
        enabled: boolean;
    };
}, "gpio">;
export declare const setGPIO: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, string>;
