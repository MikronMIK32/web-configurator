declare const interfaceReducer: import("redux").Reducer<import("redux").CombinedState<{
    spi: {
        spi0: {
            mode: import("./spi").Mode.DISABLED;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: import("./spi").Mode.MASTER;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
            peripheralDecoder?: import("./spi").PeripheralDecoder | undefined;
            slaveSignalControl?: import("./spi").SlaveSignalControl | undefined;
            slave?: import("./spi").Slave | undefined;
        } | {
            mode: import("./spi").Mode.SLAVE;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
        };
        spi1: {
            mode: import("./spi").Mode.DISABLED;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
        } | {
            divider: number;
            mode: import("./spi").Mode.MASTER;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
            peripheralDecoder?: import("./spi").PeripheralDecoder | undefined;
            slaveSignalControl?: import("./spi").SlaveSignalControl | undefined;
            slave?: import("./spi").Slave | undefined;
        } | {
            mode: import("./spi").Mode.SLAVE;
            tickPhase: import("./spi").TickPhase;
            tickPolarity: import("./spi").TickPolarity;
            txThreshold: number;
        };
    };
    i2c: {
        i2c0: {
            mode: import("./i2c").Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: import("./i2c").Mode.MASTER;
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
            mode: import("./i2c").Mode.SLAVE;
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
            extraAddressMask: import("./i2c").ExtraAddressMask | null;
        };
        i2c1: {
            mode: import("./i2c").Mode.DISABLED;
            frequency: {
                preliminaryDivider: number;
                scldelDuration: number;
                sdadelDuration: number;
            };
            digitalFilter: number;
            analogFilter: boolean;
        } | {
            mode: import("./i2c").Mode.MASTER;
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
            mode: import("./i2c").Mode.SLAVE;
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
            extraAddressMask: import("./i2c").ExtraAddressMask | null;
        };
    };
    usart: {
        enabled: boolean;
    };
}>, import("redux").AnyAction>;
export default interfaceReducer;
