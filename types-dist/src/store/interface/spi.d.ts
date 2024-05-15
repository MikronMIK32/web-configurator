import type { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: any;
};
export declare enum TickPhase {
    ACTIVE_OUTSIDE = "active-outside",
    INACTIVE_OUTSIDE = "inactive-outside"
}
export declare const tickPhaseOptions: OptionShape[];
export declare enum TickPolarity {
    LOW = "low",
    HIGH = "high"
}
export declare const tickPolarityOptions: OptionShape[];
export declare enum PeripheralDecoder {
    ONE_OF_FOUR = "one-of-four",
    EXTERNAL = "external"
}
declare enum InternalDevice {
    ONE = 0,
    TWO = 1,
    THREE = 2,
    FOUR = 3
}
export declare const internalDecoderDeviceOptions: OptionShape[];
export declare const peripheralDecoderOptions: OptionShape[];
export declare enum SlaveSignalControl {
    AUTO = "auto",
    MANUAL = "manual"
}
export declare const slaveSignalControlOptions: OptionShape[];
export declare const dividerOptions: OptionShape[];
export declare const txThresholdOptions: OptionShape[];
export declare enum Slave {
    NONE = "none",
    CS0 = "CS0",
    CS1 = "CS1",
    CS2 = "CS2",
    CS3 = "CS3"
}
export declare const slaveOptions: OptionShape[];
export declare enum Mode {
    DISABLED = "disabled",
    MASTER = "master",
    SLAVE = "slave"
}
export declare const modeOptions: OptionShape[];
declare const commonSchema: z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, {
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}>;
declare const masterSchema: z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.MASTER>;
    divider: z.ZodNumber;
    peripheralDecoder: z.ZodOptional<z.ZodNativeEnum<typeof PeripheralDecoder>>;
    slaveSignalControl: z.ZodOptional<z.ZodNativeEnum<typeof SlaveSignalControl>>;
    slave: z.ZodOptional<z.ZodNativeEnum<typeof Slave>>;
}, "strip", z.ZodTypeAny, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}>;
declare const union: z.ZodUnion<[z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.DISABLED>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, {
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}>, z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.MASTER>;
    divider: z.ZodNumber;
    peripheralDecoder: z.ZodOptional<z.ZodNativeEnum<typeof PeripheralDecoder>>;
    slaveSignalControl: z.ZodOptional<z.ZodNativeEnum<typeof SlaveSignalControl>>;
    slave: z.ZodOptional<z.ZodNativeEnum<typeof Slave>>;
}, "strip", z.ZodTypeAny, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}>, z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.SLAVE>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}>]>;
export declare const spiStateSchema: z.ZodIntersection<z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.DISABLED>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, {
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}>, z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.MASTER>;
    divider: z.ZodNumber;
    peripheralDecoder: z.ZodOptional<z.ZodNativeEnum<typeof PeripheralDecoder>>;
    slaveSignalControl: z.ZodOptional<z.ZodNativeEnum<typeof SlaveSignalControl>>;
    slave: z.ZodOptional<z.ZodNativeEnum<typeof Slave>>;
}, "strip", z.ZodTypeAny, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}, {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
}>, z.ZodObject<{
    tickPhase: z.ZodNativeEnum<typeof TickPhase>;
    tickPolarity: z.ZodNativeEnum<typeof TickPolarity>;
    txThreshold: z.ZodNumber;
    mode: z.ZodLiteral<Mode.SLAVE>;
}, "strip", z.ZodTypeAny, {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}>]>, z.ZodDiscriminatedUnion<"peripheralDecoder", [z.ZodObject<{
    peripheralDecoder: z.ZodLiteral<PeripheralDecoder.EXTERNAL>;
    externalDecoderValue: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    peripheralDecoder: PeripheralDecoder.EXTERNAL;
    externalDecoderValue: number;
}, {
    peripheralDecoder: PeripheralDecoder.EXTERNAL;
    externalDecoderValue: number;
}>, z.ZodObject<{
    peripheralDecoder: z.ZodLiteral<PeripheralDecoder.ONE_OF_FOUR>;
    internalDecoderDevice: z.ZodNativeEnum<typeof InternalDevice>;
}, "strip", z.ZodTypeAny, {
    peripheralDecoder: PeripheralDecoder.ONE_OF_FOUR;
    internalDecoderDevice: InternalDevice;
}, {
    peripheralDecoder: PeripheralDecoder.ONE_OF_FOUR;
    internalDecoderDevice: InternalDevice;
}>]>>;
export type SpiState = z.infer<typeof union>;
export declare const spiInitialState: SpiState;
export declare const spiInitialStateMaster: Omit<z.infer<typeof masterSchema>, keyof z.infer<typeof commonSchema>>;
export declare const spiSlice: import("@reduxjs/toolkit").Slice<{
    spi0: {
        mode: Mode.DISABLED;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
    } | {
        divider: number;
        mode: Mode.MASTER;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
        peripheralDecoder?: PeripheralDecoder | undefined;
        slaveSignalControl?: SlaveSignalControl | undefined;
        slave?: Slave | undefined;
    } | {
        mode: Mode.SLAVE;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
    };
    spi1: {
        mode: Mode.DISABLED;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
    } | {
        divider: number;
        mode: Mode.MASTER;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
        peripheralDecoder?: PeripheralDecoder | undefined;
        slaveSignalControl?: SlaveSignalControl | undefined;
        slave?: Slave | undefined;
    } | {
        mode: Mode.SLAVE;
        tickPhase: TickPhase;
        tickPolarity: TickPolarity;
        txThreshold: number;
    };
}, {
    setSpi0: (old: import("immer/dist/internal").WritableDraft<{
        spi0: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
        spi1: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
    }>, action: PayloadAction<SpiState>) => {
        spi0: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
        spi1: import("immer/dist/internal").WritableDraft<{
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        }> | import("immer/dist/internal").WritableDraft<{
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        }>;
    };
    setSpi1: (old: import("immer/dist/internal").WritableDraft<{
        spi0: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
        spi1: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
    }>, action: PayloadAction<SpiState>) => {
        spi1: {
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        } | {
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        };
        spi0: import("immer/dist/internal").WritableDraft<{
            mode: Mode.DISABLED;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        }> | import("immer/dist/internal").WritableDraft<{
            divider: number;
            mode: Mode.MASTER;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
            peripheralDecoder?: PeripheralDecoder | undefined;
            slaveSignalControl?: SlaveSignalControl | undefined;
            slave?: Slave | undefined;
        }> | import("immer/dist/internal").WritableDraft<{
            mode: Mode.SLAVE;
            tickPhase: TickPhase;
            tickPolarity: TickPolarity;
            txThreshold: number;
        }>;
    };
}, "spi">;
export declare const setSpi0: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
} | {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
} | {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, string>, setSpi1: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Mode.DISABLED;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
} | {
    divider: number;
    mode: Mode.MASTER;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
    peripheralDecoder?: PeripheralDecoder | undefined;
    slaveSignalControl?: SlaveSignalControl | undefined;
    slave?: Slave | undefined;
} | {
    mode: Mode.SLAVE;
    tickPhase: TickPhase;
    tickPolarity: TickPolarity;
    txThreshold: number;
}, string>;
export {};
