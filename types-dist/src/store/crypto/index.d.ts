declare const cryptoReducer: import("redux").Reducer<import("redux").CombinedState<{
    crc: {
        enabled: boolean;
        algorithm: "CRC-32/zlib" | "CRC-32/BZIP2" | "CRC-32C" | "CRC-32D" | "CRC-32/MPEG-2" | "CRC-32/POSIX" | "CRC-32Q" | "CRC-32/JAMCRC" | "CRC-32/XFER" | "CUSTOM";
        poly: number;
        init: number;
        xorOut: string;
        refIn: boolean;
        refOut: boolean;
    };
    crypto: {
        enabled: boolean;
        mode: import("./crypto").EncryptionMode;
        algorithm: import("./crypto").EncryptionAlgo;
        permutation: import("./crypto").WordPermutation;
        order: import("./crypto").WordOrder;
    };
}>, import("redux").AnyAction>;
export default cryptoReducer;
