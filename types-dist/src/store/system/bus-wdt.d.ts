import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const busWdtStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type BusWDTState = z.infer<typeof busWdtStateSchema>;
export declare const busWdtInitialState: BusWDTState;
export declare const busWdtSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
}, {
    setBusWDT: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
    }>, action: PayloadAction<BusWDTState>) => {
        enabled: boolean;
    };
}, "bus-wdt">;
export declare const setBusWDT: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, string>;
