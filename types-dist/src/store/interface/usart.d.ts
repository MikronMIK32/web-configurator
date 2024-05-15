import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const usartStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled: boolean;
}>;
export type USARTState = z.infer<typeof usartStateSchema>;
export declare const usartInitialState: USARTState;
export declare const usartSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
}, {
    setUSART: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
    }>, action: PayloadAction<USARTState>) => {
        enabled: boolean;
    };
}, "usart">;
export declare const setUSART: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
}, string>;
