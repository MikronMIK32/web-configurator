import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
export declare const CRC_DB: {
    readonly 'CRC-32/zlib': {
        readonly poly: 79764919;
        readonly init: 4294967295;
        readonly refIn: true;
        readonly refOut: true;
        readonly xorOut: "0xFFFFFFFF";
        readonly check: 3421780262;
    };
    readonly 'CRC-32/BZIP2': {
        readonly poly: 79764919;
        readonly init: 4294967295;
        readonly refIn: false;
        readonly refOut: false;
        readonly xorOut: "0xFFFFFFFF";
        readonly check: 4236843288;
    };
    readonly 'CRC-32C': {
        readonly poly: 517762881;
        readonly init: 4294967295;
        readonly refIn: true;
        readonly refOut: true;
        readonly xorOut: "0xFFFFFFFF";
        readonly check: 3808858755;
    };
    readonly 'CRC-32D': {
        readonly poly: 2821953579;
        readonly init: 4294967295;
        readonly refIn: true;
        readonly refOut: true;
        readonly xorOut: "0xFFFFFFFF";
        readonly check: 2268157302;
    };
    readonly 'CRC-32/MPEG-2': {
        readonly poly: 79764919;
        readonly init: 4294967295;
        readonly refIn: false;
        readonly refOut: false;
        readonly xorOut: "0x00000000";
        readonly check: 58124007;
    };
    readonly 'CRC-32/POSIX': {
        readonly poly: 79764919;
        readonly init: 0;
        readonly refIn: false;
        readonly refOut: false;
        readonly xorOut: "0xFFFFFFFF";
        readonly check: 1985902208;
    };
    readonly 'CRC-32Q': {
        readonly poly: 2168537515;
        readonly init: 0;
        readonly refIn: false;
        readonly refOut: false;
        readonly xorOut: "0x00000000";
        readonly check: 806403967;
    };
    readonly 'CRC-32/JAMCRC': {
        readonly poly: 79764919;
        readonly init: 4294967295;
        readonly refIn: true;
        readonly refOut: true;
        readonly xorOut: "0x00000000";
        readonly check: 873187033;
    };
    readonly 'CRC-32/XFER': {
        readonly poly: 175;
        readonly init: 0;
        readonly refIn: false;
        readonly refOut: false;
        readonly xorOut: "0x00000000";
        readonly check: 3171672888;
    };
};
export type CRC_NAMES_TYPE = keyof typeof CRC_DB;
export declare const KNOWN_CRC_NAMES: string[];
export declare const crcStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    algorithm: z.ZodType<"CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM", z.ZodTypeDef, "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM">;
    poly: z.ZodNumber;
    init: z.ZodNumber;
    xorOut: z.ZodString;
    refIn: z.ZodBoolean;
    refOut: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
    poly: number;
    init: number;
    xorOut: string;
    refIn: boolean;
    refOut: boolean;
}, {
    enabled: boolean;
    algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
    poly: number;
    init: number;
    xorOut: string;
    refIn: boolean;
    refOut: boolean;
}>;
export type CrcState = z.infer<typeof crcStateSchema>;
export declare const crcInitialState: CrcState;
export declare const crcSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
    poly: number;
    init: number;
    xorOut: string;
    refIn: boolean;
    refOut: boolean;
}, {
    setCrc: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
        poly: number;
        init: number;
        xorOut: string;
        refIn: boolean;
        refOut: boolean;
    }>, action: PayloadAction<CrcState>) => {
        enabled: boolean;
        algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
        poly: number;
        init: number;
        xorOut: string;
        refIn: boolean;
        refOut: boolean;
    };
}, "crc">;
export declare const setCrc: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
    poly: number;
    init: number;
    xorOut: string;
    refIn: boolean;
    refOut: boolean;
}, string>;
