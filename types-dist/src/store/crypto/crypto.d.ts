import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: string;
};
export declare enum EncryptionAlgo {
    KUZNECHIK = "KUZNECHIK",
    MAGMA = "MAGMA",
    AES = "AES"
}
export declare const algoOptions: OptionShape[];
export declare enum EncryptionMode {
    ECB = "ECB",
    CBC = "CBC",
    CTR = "CTR"
}
export declare const modeOptions: OptionShape[];
export declare enum WordPermutation {
    NORMAL = "normal",
    HALF = "half",
    BYTEWISE = "bytewise",
    BITWISE = "bitwise"
}
export declare const wordPermutationOptions: OptionShape[];
export declare enum WordOrder {
    LSB = "lsb",
    MSB = "msb"
}
export declare const wordOrderOptions: OptionShape[];
export declare const cryptoStateSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    algorithm: z.ZodNativeEnum<typeof EncryptionAlgo>;
    mode: z.ZodNativeEnum<typeof EncryptionMode>;
    permutation: z.ZodNativeEnum<typeof WordPermutation>;
    order: z.ZodNativeEnum<typeof WordOrder>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    mode: EncryptionMode;
    algorithm: EncryptionAlgo;
    permutation: WordPermutation;
    order: WordOrder;
}, {
    enabled: boolean;
    mode: EncryptionMode;
    algorithm: EncryptionAlgo;
    permutation: WordPermutation;
    order: WordOrder;
}>;
export type CryptoState = z.infer<typeof cryptoStateSchema>;
export declare const cryptoInitialState: CryptoState;
export declare const cryptoSlice: import("@reduxjs/toolkit").Slice<{
    enabled: boolean;
    mode: EncryptionMode;
    algorithm: EncryptionAlgo;
    permutation: WordPermutation;
    order: WordOrder;
}, {
    setCrypto: (_: import("immer/dist/internal").WritableDraft<{
        enabled: boolean;
        mode: EncryptionMode;
        algorithm: EncryptionAlgo;
        permutation: WordPermutation;
        order: WordOrder;
    }>, action: PayloadAction<CryptoState>) => {
        enabled: boolean;
        mode: EncryptionMode;
        algorithm: EncryptionAlgo;
        permutation: WordPermutation;
        order: WordOrder;
    };
}, "crypto">;
export declare const setCrypto: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    enabled: boolean;
    mode: EncryptionMode;
    algorithm: EncryptionAlgo;
    permutation: WordPermutation;
    order: WordOrder;
}, string>;
export {};
