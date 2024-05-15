import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const vccMonitorStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type VccMonitorState = z.infer<typeof vccMonitorStateSchema>;
export declare const vccMonitorInitialState: VccMonitorState;
export declare const vccMonitorSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
}, {
    setVccMonitor: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
    }>, action: PayloadAction<VccMonitorState>) => {
        enabled: boolean;
    };
}, "vcc-monitor">;
export declare const setVccMonitor: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, string>;
