declare const analogReducer: import("redux").Reducer<import("redux").CombinedState<{
    adc: {
        enabled: boolean;
        vRef: import("./adc").VRef;
        channel: import("./adc").AdcChannel;
    };
    dac: {
        enabled: boolean;
        vRef: import("./adc").VRef;
        channel: import("./dac").DacChannel;
        divider: number;
    };
    temp: {
        enabled: boolean;
        clockSource: import("./temp").ClockSource;
        freq: number;
    };
}>, import("redux").AnyAction>;
export default analogReducer;
