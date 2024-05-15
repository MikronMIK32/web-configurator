import type { PayloadAction } from '@reduxjs/toolkit';
import { toZod } from 'tozod';
import { z } from 'zod';
export declare enum RtcSourceType {
    External = "internal",
    Internal = "external"
}
export interface RtcTimeDate {
    year: number;
    month: number;
    day: number;
    weekDay: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export interface AlarmTimeDate {
    year: number | null;
    month: number | null;
    day: number | null;
    weekDay: number | null;
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
}
export declare const alarmDateTimeSchema: z.ZodObject<{
    year: z.ZodNullable<z.ZodNumber>;
    month: z.ZodNullable<z.ZodNumber>;
    day: z.ZodNullable<z.ZodNumber>;
    weekDay: z.ZodNullable<z.ZodNumber>;
    hours: z.ZodNullable<z.ZodNumber>;
    minutes: z.ZodNullable<z.ZodNumber>;
    seconds: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, AlarmTimeDate, AlarmTimeDate>;
export declare const rtcDateTimeSchema: z.ZodObject<{
    year: z.ZodNumber;
    month: z.ZodNumber;
    day: z.ZodNumber;
    weekDay: z.ZodNumber;
    hours: z.ZodNumber;
    minutes: z.ZodNumber;
    seconds: z.ZodNumber;
}, "strip", z.ZodTypeAny, RtcTimeDate, RtcTimeDate>;
export interface RtcState {
    rtcEnabled: boolean;
    alarmEnabled: boolean;
    rtcSource: RtcSourceType;
    rtcDateTime: RtcTimeDate;
    rtcRegisters: number[];
    alarmDateTime: AlarmTimeDate;
}
export declare const rtcStateSchema: toZod<Omit<RtcState, 'rtcSource'>>;
export declare const rtcRegisterSchema: z.ZodEffects<z.ZodNumber, number, unknown>;
export declare const rtcInitialState: RtcState;
export declare const rtcSlice: import("@reduxjs/toolkit").Slice<RtcState, {
    setRtc: (_: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<RtcState>) => {
        rtcEnabled: boolean;
        alarmEnabled: boolean;
        rtcSource: RtcSourceType;
        rtcDateTime: RtcTimeDate;
        rtcRegisters: number[];
        alarmDateTime: AlarmTimeDate;
    };
    setAlarmEnabled: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<boolean>) => void;
    setRtcEnabled: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<boolean>) => void;
    setRtcDateTime: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<RtcTimeDate>) => void;
    setRtcSource: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<RtcSourceType>) => void;
    setRtcRegisters: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<RtcState['rtcRegisters']>) => void;
    setRtcRegister: (state: import("immer/dist/internal").WritableDraft<RtcState>, action: PayloadAction<{
        index: number;
        value: number;
    }>) => void;
}, "rtc">;
export declare const setRtc: import("@reduxjs/toolkit").ActionCreatorWithPayload<RtcState, string>, setAlarmEnabled: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>, setRtcEnabled: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>, setRtcDateTime: import("@reduxjs/toolkit").ActionCreatorWithPayload<RtcTimeDate, string>, setRtcSource: import("@reduxjs/toolkit").ActionCreatorWithPayload<RtcSourceType, string>, setRtcRegisters: import("@reduxjs/toolkit").ActionCreatorWithPayload<number[], string>, setRtcRegister: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    index: number;
    value: number;
}, string>;
