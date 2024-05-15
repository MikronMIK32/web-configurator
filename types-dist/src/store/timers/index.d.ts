declare const timersReducer: import("redux").Reducer<import("redux").CombinedState<{
    rtc: import("./rtc").RtcState;
    timer16: {
        timer16_0: {
            mode: import("./timer16").Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: import("./timer16").Timer16Polarity;
            };
            updateMode: import("./timer16").Timer16UpdateMode;
            triggerSource: import("./timer16").TriggerSource;
            activeFront: import("./timer16").Timer16Polarity;
            wavePolarity: import("./timer16").Timer16WavePolarity;
            triggerDigitalFilter: import("./timer16").Timer16DigitalFilter;
        };
        timer16_1: {
            mode: import("./timer16").Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: import("./timer16").Timer16Polarity;
            };
            updateMode: import("./timer16").Timer16UpdateMode;
            triggerSource: import("./timer16").TriggerSource;
            activeFront: import("./timer16").Timer16Polarity;
            wavePolarity: import("./timer16").Timer16WavePolarity;
            triggerDigitalFilter: import("./timer16").Timer16DigitalFilter;
        };
        timer16_2: {
            mode: import("./timer16").Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: import("./timer16").Timer16Polarity;
            };
            updateMode: import("./timer16").Timer16UpdateMode;
            triggerSource: import("./timer16").TriggerSource;
            activeFront: import("./timer16").Timer16Polarity;
            wavePolarity: import("./timer16").Timer16WavePolarity;
            triggerDigitalFilter: import("./timer16").Timer16DigitalFilter;
        };
    };
}>, import("redux").AnyAction>;
export default timersReducer;
