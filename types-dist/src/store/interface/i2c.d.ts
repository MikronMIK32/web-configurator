import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: string;
};
export declare enum ExtraAddressMask {
    NO_MASK = "no-mask",
    SEVEN_TWO = "7-2",
    SEVEN_THREE = "7-3",
    SEVEN_FOUR = "7-4",
    SEVEN_FIVE = "7-5",
    SEVEN_SIX = "7-6",
    SEVEN = "7",
    ALL_UNRESERVED = "all-unreserved"
}
export declare const EXTRA_ADDRESS_MASK_OPTIONS: OptionShape[];
export declare enum Mode {
    DISABLED = "disabled",
    MASTER = "master",
    SLAVE = "slave"
}
export declare const modeOptions: OptionShape[];
declare const union: z.ZodUnion<[z.ZodObject<{
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    }>;
    digitalFilter: z.ZodEffects<z.ZodNumber, number, unknown>;
    analogFilter: z.ZodBoolean;
    mode: z.ZodLiteral<Mode.DISABLED>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
}, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    analogFilter: boolean;
    digitalFilter?: unknown;
}>, z.ZodObject<{
    digitalFilter: z.ZodEffects<z.ZodNumber, number, unknown>;
    analogFilter: z.ZodBoolean;
    mode: z.ZodLiteral<Mode.MASTER>;
    autoEnd: z.ZodBoolean;
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sclHoldOneDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sclHoldZeroDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
}, {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    };
    analogFilter: boolean;
    autoEnd: boolean;
    digitalFilter?: unknown;
}>, z.ZodObject<{
    mode: z.ZodLiteral<Mode.SLAVE>;
    stretchClockSingal: z.ZodNullable<z.ZodBoolean>;
    allowSharedAddress: z.ZodBoolean;
    controlAck: z.ZodBoolean;
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    }>;
    extraAddressEnabled: z.ZodBoolean;
    mainAddress: z.ZodEffects<z.ZodNumber, number, unknown>;
    extraAddress: z.ZodNullable<z.ZodEffects<z.ZodNumber, number, unknown>>;
    extraAddressMask: z.ZodNullable<z.ZodNativeEnum<typeof ExtraAddressMask>>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    extraAddressMask: ExtraAddressMask | null;
    mainAddress?: unknown;
    extraAddress?: unknown;
}>]>;
export declare const i2cStateSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    }>;
    digitalFilter: z.ZodEffects<z.ZodNumber, number, unknown>;
    analogFilter: z.ZodBoolean;
    mode: z.ZodLiteral<Mode.DISABLED>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
}, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    analogFilter: boolean;
    digitalFilter?: unknown;
}>, z.ZodObject<{
    digitalFilter: z.ZodEffects<z.ZodNumber, number, unknown>;
    analogFilter: z.ZodBoolean;
    mode: z.ZodLiteral<Mode.MASTER>;
    autoEnd: z.ZodBoolean;
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sclHoldOneDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sclHoldZeroDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
}, {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    };
    analogFilter: boolean;
    autoEnd: boolean;
    digitalFilter?: unknown;
}>, z.ZodObject<{
    mode: z.ZodLiteral<Mode.SLAVE>;
    stretchClockSingal: z.ZodNullable<z.ZodBoolean>;
    allowSharedAddress: z.ZodBoolean;
    controlAck: z.ZodBoolean;
    frequency: z.ZodObject<{
        preliminaryDivider: z.ZodEffects<z.ZodNumber, number, unknown>;
        scldelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
        sdadelDuration: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    }, {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    }>;
    extraAddressEnabled: z.ZodBoolean;
    mainAddress: z.ZodEffects<z.ZodNumber, number, unknown>;
    extraAddress: z.ZodNullable<z.ZodEffects<z.ZodNumber, number, unknown>>;
    extraAddressMask: z.ZodNullable<z.ZodNativeEnum<typeof ExtraAddressMask>>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    extraAddressMask: ExtraAddressMask | null;
    mainAddress?: unknown;
    extraAddress?: unknown;
}>]>, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    analogFilter: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    };
    analogFilter: boolean;
    autoEnd: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    extraAddressMask: ExtraAddressMask | null;
    mainAddress?: unknown;
    extraAddress?: unknown;
}>, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    analogFilter: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    };
    analogFilter: boolean;
    autoEnd: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    extraAddressMask: ExtraAddressMask | null;
    mainAddress?: unknown;
    extraAddress?: unknown;
}>, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, {
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    analogFilter: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
        sclHoldOneDuration?: unknown;
        sclHoldZeroDuration?: unknown;
    };
    analogFilter: boolean;
    autoEnd: boolean;
    digitalFilter?: unknown;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider?: unknown;
        scldelDuration?: unknown;
        sdadelDuration?: unknown;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    extraAddressMask: ExtraAddressMask | null;
    mainAddress?: unknown;
    extraAddress?: unknown;
}>;
export type I2CState = z.infer<typeof union>;
export declare const initialState: I2CState;
export declare const masterInitialState: I2CState;
export declare const slaveInitialState: I2CState;
export declare const i2cSlice: import("@reduxjs/toolkit").Slice<{
    i2c0: {
        mode: Mode.DISABLED;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
        };
        digitalFilter: number;
        analogFilter: boolean;
    } | {
        mode: Mode.MASTER;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
            sclHoldOneDuration: number;
            sclHoldZeroDuration: number;
        };
        digitalFilter: number;
        analogFilter: boolean;
        autoEnd: boolean;
    } | {
        mode: Mode.SLAVE;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
        };
        stretchClockSingal: boolean | null;
        allowSharedAddress: boolean;
        controlAck: boolean;
        extraAddressEnabled: boolean;
        mainAddress: number;
        extraAddress: number | null;
        extraAddressMask: ExtraAddressMask | null;
    };
    i2c1: {
        mode: Mode.DISABLED;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
        };
        digitalFilter: number;
        analogFilter: boolean;
    } | {
        mode: Mode.MASTER;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
            sclHoldOneDuration: number;
            sclHoldZeroDuration: number;
        };
        digitalFilter: number;
        analogFilter: boolean;
        autoEnd: boolean;
    } | {
        mode: Mode.SLAVE;
        frequency: {
            preliminaryDivider: number;
            scldelDuration: number;
            sdadelDuration: number;
        };
        stretchClockSingal: boolean | null;
        allowSharedAddress: boolean;
        controlAck: boolean;
        extraAddressEnabled: boolean;
        mainAddress: number;
        extraAddress: number | null;
        extraAddressMask: ExtraAddressMask | null;
    };
}, {
    setI2C0: (old: import("immer/dist/internal").WritableDraft<{
        i2c0: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
        i2c1: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
    }>, action: PayloadAction<I2CState>) => {
        i2c0: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
        i2c1: import("immer/dist/internal").WritableDraft<{
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        }>;
    };
    setI2C1: (old: import("immer/dist/internal").WritableDraft<{
        i2c0: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
        i2c1: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
    }>, action: PayloadAction<I2CState>) => {
        i2c1: {
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        } | {
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        };
        i2c0: import("immer/dist/internal").WritableDraft<{
            mode: Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.MASTER;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
                sclHoldOneDuration: number;
                sclHoldZeroDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
            autoEnd: boolean;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.SLAVE;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            stretchClockSingal: boolean | null;
            allowSharedAddress: boolean;
            controlAck: boolean;
            extraAddressEnabled: boolean;
            mainAddress: number;
            extraAddress: number | null;
            extraAddressMask: ExtraAddressMask | null;
        }>;
    };
}, "i2c">;
export declare const setI2C0: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, string>, setI2C1: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Mode.DISABLED;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
} | {
    mode: Mode.MASTER;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
        sclHoldOneDuration: number;
        sclHoldZeroDuration: number;
    };
    digitalFilter: number;
    analogFilter: boolean;
    autoEnd: boolean;
} | {
    mode: Mode.SLAVE;
    frequency: {
        preliminaryDivider: number;
        scldelDuration: number;
        sdadelDuration: number;
    };
    stretchClockSingal: boolean | null;
    allowSharedAddress: boolean;
    controlAck: boolean;
    extraAddressEnabled: boolean;
    mainAddress: number;
    extraAddress: number | null;
    extraAddressMask: ExtraAddressMask | null;
}, string>;
export {};
