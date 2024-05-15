declare const systemReducer: import("redux").Reducer<import("redux").CombinedState<{
    pcc: {
        clockSources: import("./pcc").PCCClockSource[];
        systemSource: import("./pcc").PCCClockSource;
        forceSystemSource: boolean;
        monitorSource: import("./pcc").MonitorClockSource;
        ahb: number;
        apb_m: number;
        ahb_p: number;
        coeff_HSI32M: number;
        coeff_LSI32K: number;
    };
    otp: {
        read_mode: import("./otp").ReadMode;
    };
    busWdt: {
        enabled: boolean;
    };
    gpio: {
        enabled: boolean;
    };
    wdt: {
        enabled: boolean;
        clockSource: import("./wdt").ClockSource;
        timeBeforeReload: number;
    };
    pdp: {
        enabled: boolean;
    };
    vccMonitor: {
        enabled: boolean;
    };
}>, import("redux").AnyAction>;
export default systemReducer;
