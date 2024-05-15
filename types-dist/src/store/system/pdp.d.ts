import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const pdpStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type PDPState = z.infer<typeof pdpStateSchema>;
export declare const pdpInitialState: PDPState;
export declare const pdpSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
}, {
    setPDP: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
    }>, action: PayloadAction<PDPState>) => {
        enabled: boolean;
    };
}, "pdp">;
export declare const setPDP: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, string>;
