import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare enum ReadMode {
    TWO_STEPS = "two-steps",
    THREE_STEPS = "three-steps"
}
export declare const readModeOptions: {
    key: string;
    value: ReadMode;
}[];
export declare const otpStateSchema: z.ZodObject<{
    read_mode: z.ZodNativeEnum<typeof ReadMode>;
}, "strip", z.ZodTypeAny, {
    read_mode: ReadMode;
}, {
    read_mode: ReadMode;
}>;
export type OtpState = z.infer<typeof otpStateSchema>;
export declare const otpInitialState: OtpState;
export declare const otpSlice: import("@reduxjs/toolkit").Slice<{
    read_mode: ReadMode;
}, {
    setOtp: (_: import("immer/dist/internal").WritableDraft<{
        read_mode: ReadMode;
    }>, action: PayloadAction<OtpState>) => {
        read_mode: ReadMode;
    };
}, "otp">;
export declare const setOtp: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    read_mode: ReadMode;
}, string>;
