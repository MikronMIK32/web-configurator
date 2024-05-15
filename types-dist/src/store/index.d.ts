/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    timers: import("redux").CombinedState<{
        rtc: import("./timers/rtc").RtcState;
        timer16: {
            timer16_0: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
            timer16_1: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
            timer16_2: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
        };
    }>;
    analog: import("redux").CombinedState<{
        adc: {
            enabled: boolean;
            vRef: import("./analog/adc").VRef;
            channel: import("./analog/adc").AdcChannel;
        };
        dac: {
            enabled: boolean;
            vRef: import("./analog/adc").VRef;
            channel: import("./analog/dac").DacChannel;
            divider: number;
        };
        temp: {
            enabled: boolean;
            clockSource: import("./analog/temp").ClockSource;
            freq: number;
        };
    }>;
    crypto: import("redux").CombinedState<{
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
            mode: import("./crypto/crypto").EncryptionMode;
            algorithm: import("./crypto/crypto").EncryptionAlgo;
            permutation: import("./crypto/crypto").WordPermutation;
            order: import("./crypto/crypto").WordOrder;
        };
    }>;
    interface: import("redux").CombinedState<{
        spi: {
            spi0: {
                mode: import("./interface/spi").Mode.DISABLED;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            } | {
                divider: number;
                mode: import("./interface/spi").Mode.MASTER;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
                peripheralDecoder?: import("./interface/spi").PeripheralDecoder | undefined;
                slaveSignalControl?: import("./interface/spi").SlaveSignalControl | undefined;
                slave?: import("./interface/spi").Slave | undefined;
            } | {
                mode: import("./interface/spi").Mode.SLAVE;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            };
            spi1: {
                mode: import("./interface/spi").Mode.DISABLED;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            } | {
                divider: number;
                mode: import("./interface/spi").Mode.MASTER;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
                peripheralDecoder?: import("./interface/spi").PeripheralDecoder | undefined;
                slaveSignalControl?: import("./interface/spi").SlaveSignalControl | undefined;
                slave?: import("./interface/spi").Slave | undefined;
            } | {
                mode: import("./interface/spi").Mode.SLAVE;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            };
        };
        i2c: {
            i2c0: {
                mode: import("./interface/i2c").Mode.DISABLED;
                frequency: {
                    preliminaryDivider: number;
                    scldelDuration: number;
                    sdadelDuration: number;
                };
                digitalFilter: number;
                analogFilter: boolean;
            } | {
                mode: import("./interface/i2c").Mode.MASTER;
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
                mode: import("./interface/i2c").Mode.SLAVE;
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
                extraAddressMask: import("./interface/i2c").ExtraAddressMask | null;
            };
            i2c1: {
                mode: import("./interface/i2c").Mode.DISABLED;
                frequency: {
                    preliminaryDivider: number;
                    scldelDuration: number;
                    sdadelDuration: number;
                };
                digitalFilter: number;
                analogFilter: boolean;
            } | {
                mode: import("./interface/i2c").Mode.MASTER;
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
                mode: import("./interface/i2c").Mode.SLAVE;
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
                extraAddressMask: import("./interface/i2c").ExtraAddressMask | null;
            };
        };
        usart: {
            enabled: boolean;
        };
    }>;
    system: import("redux").CombinedState<{
        pcc: {
            clockSources: import("./system/pcc").PCCClockSource[];
            systemSource: import("./system/pcc").PCCClockSource;
            forceSystemSource: boolean;
            monitorSource: import("./system/pcc").MonitorClockSource;
            ahb: number;
            apb_m: number;
            ahb_p: number;
            coeff_HSI32M: number;
            coeff_LSI32K: number;
        };
        otp: {
            read_mode: import("./system/otp").ReadMode;
        };
        busWdt: {
            enabled: boolean;
        };
        gpio: {
            enabled: boolean;
        };
        wdt: {
            enabled: boolean;
            clockSource: import("./system/wdt").ClockSource;
            timeBeforeReload: number;
        };
        pdp: {
            enabled: boolean;
        };
        vccMonitor: {
            enabled: boolean;
        };
    }>;
}>, import("redux").AnyAction>;
export type RootReducer = ReturnType<typeof rootReducer>;
declare const store: import("@reduxjs/toolkit").EnhancedStore<import("redux").EmptyObject & {
    timers: import("redux").CombinedState<{
        rtc: import("./timers/rtc").RtcState;
        timer16: {
            timer16_0: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
            timer16_1: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
            timer16_2: {
                mode: import("./timers/timer16").Timer16Mode;
                externalTrigger: boolean;
                generateWaveForm: boolean;
                frequency: {
                    divider: number;
                    polarity: import("./timers/timer16").Timer16Polarity;
                };
                updateMode: import("./timers/timer16").Timer16UpdateMode;
                triggerSource: import("./timers/timer16").TriggerSource;
                activeFront: import("./timers/timer16").Timer16Polarity;
                wavePolarity: import("./timers/timer16").Timer16WavePolarity;
                triggerDigitalFilter: import("./timers/timer16").Timer16DigitalFilter;
            };
        };
    }>;
    analog: import("redux").CombinedState<{
        adc: {
            enabled: boolean;
            vRef: import("./analog/adc").VRef;
            channel: import("./analog/adc").AdcChannel;
        };
        dac: {
            enabled: boolean;
            vRef: import("./analog/adc").VRef;
            channel: import("./analog/dac").DacChannel;
            divider: number;
        };
        temp: {
            enabled: boolean;
            clockSource: import("./analog/temp").ClockSource;
            freq: number;
        };
    }>;
    crypto: import("redux").CombinedState<{
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
            mode: import("./crypto/crypto").EncryptionMode;
            algorithm: import("./crypto/crypto").EncryptionAlgo;
            permutation: import("./crypto/crypto").WordPermutation;
            order: import("./crypto/crypto").WordOrder;
        };
    }>;
    interface: import("redux").CombinedState<{
        spi: {
            spi0: {
                mode: import("./interface/spi").Mode.DISABLED;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            } | {
                divider: number;
                mode: import("./interface/spi").Mode.MASTER;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
                peripheralDecoder?: import("./interface/spi").PeripheralDecoder | undefined;
                slaveSignalControl?: import("./interface/spi").SlaveSignalControl | undefined;
                slave?: import("./interface/spi").Slave | undefined;
            } | {
                mode: import("./interface/spi").Mode.SLAVE;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            };
            spi1: {
                mode: import("./interface/spi").Mode.DISABLED;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            } | {
                divider: number;
                mode: import("./interface/spi").Mode.MASTER;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
                peripheralDecoder?: import("./interface/spi").PeripheralDecoder | undefined;
                slaveSignalControl?: import("./interface/spi").SlaveSignalControl | undefined;
                slave?: import("./interface/spi").Slave | undefined;
            } | {
                mode: import("./interface/spi").Mode.SLAVE;
                tickPhase: import("./interface/spi").TickPhase;
                tickPolarity: import("./interface/spi").TickPolarity;
                txThreshold: number;
            };
        };
        i2c: {
            i2c0: {
                mode: import("./interface/i2c").Mode.DISABLED;
                frequency: {
                    preliminaryDivider: number;
                    scldelDuration: number;
                    sdadelDuration: number;
                };
                digitalFilter: number;
                analogFilter: boolean;
            } | {
                mode: import("./interface/i2c").Mode.MASTER;
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
                mode: import("./interface/i2c").Mode.SLAVE;
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
                extraAddressMask: import("./interface/i2c").ExtraAddressMask | null;
            };
            i2c1: {
                mode: import("./interface/i2c").Mode.DISABLED;
                frequency: {
                    preliminaryDivider: number;
                    scldelDuration: number;
                    sdadelDuration: number;
                };
                digitalFilter: number;
                analogFilter: boolean;
            } | {
                mode: import("./interface/i2c").Mode.MASTER;
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
                mode: import("./interface/i2c").Mode.SLAVE;
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
                extraAddressMask: import("./interface/i2c").ExtraAddressMask | null;
            };
        };
        usart: {
            enabled: boolean;
        };
    }>;
    system: import("redux").CombinedState<{
        pcc: {
            clockSources: import("./system/pcc").PCCClockSource[];
            systemSource: import("./system/pcc").PCCClockSource;
            forceSystemSource: boolean;
            monitorSource: import("./system/pcc").MonitorClockSource;
            ahb: number;
            apb_m: number;
            ahb_p: number;
            coeff_HSI32M: number;
            coeff_LSI32K: number;
        };
        otp: {
            read_mode: import("./system/otp").ReadMode;
        };
        busWdt: {
            enabled: boolean;
        };
        gpio: {
            enabled: boolean;
        };
        wdt: {
            enabled: boolean;
            clockSource: import("./system/wdt").ClockSource;
            timeBeforeReload: number;
        };
        pdp: {
            enabled: boolean;
        };
        vccMonitor: {
            enabled: boolean;
        };
    }>;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").Action<any>, (import("redux-thunk").ThunkMiddleware<any, import("redux").AnyAction, undefined> & {
    withExtraArgument<ExtraThunkArg, State = any, BasicAction extends import("redux").Action<any> = import("redux").AnyAction>(extraArgument: ExtraThunkArg): import("redux-thunk").ThunkMiddleware<State, BasicAction, ExtraThunkArg>;
})[]>;
export declare const persistor: import("redux-persist").Persistor;
export type RootState = ReturnType<typeof store.getState>;
export default store;
